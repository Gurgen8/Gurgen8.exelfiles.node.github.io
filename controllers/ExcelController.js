import Excel from "../models/Excel";
import Promise from "bluebird";
import HttpError from "http-errors";
import { Worker } from 'worker_threads'
import path from "path";
import fs from "fs";
import xlsx from "node-xlsx";
import _ from "lodash";
import XLSX from "xlsx";
import XLSXStyle from "xlsx-style";
import moment from "moment";
import { v4 as uuidV4 } from 'uuid'

class ExcelController {


  static parse = async (req, res, next) => {
    try {
      const worker = new Worker(path.join(__dirname, '../services/dataImporter.js'), {
        workerData: {
          buffer: req.file.buffer,
        }
      });
      worker.on('message', (data) => {
        console.log(data)
      });
      worker.on('error', (error) => {
        console.log(error)
      });
      worker.on('exit', (code) => {
        if (code !== 0) {

        }
      });
      // const file = xlsx.parse(req.file.buffer)[0].data
      // console.log(file)
      // for (let i = 1; i < file.length; i++) {
      //   const f = file[i];
      //   const toCreate = {};
      //   for (let j = 0; j < f.length; j++) {
      //     toCreate[file[0][j]] = file[i][j];
      //   }
      //   delete toCreate.id;
      //   const excel = await Excel.create(toCreate)
      // }
      res.json({
        status: 'ok',
      })
    } catch (e) {
      next(e)
    }
  }


  static export = async (req, res, next) => {
    try {
      const data = await Excel.findAll({
        raw: true,
      });

      const workbook = XLSX.utils.book_new();

      let sheet = XLSX.utils.json_to_sheet(data);

      _.forEach(sheet, (val, key) => {
        const [, col, row] = /([A-Z]+)([0-9]+)/.exec(key) || [];
        if (row === '1') {
          sheet[key].s = {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "FF0000" }
            }
          }
        }
      })


      XLSX.utils.book_append_sheet(workbook, sheet, 'Porducts');


      // const filePath = path.join(__dirname, `../temp/${uuidV4()}.xlsx`)
      // XLSX.writeFile(workbook, filePath);
      // const name = 'Products_' + moment().format('YYYY-DD-MM_HH-mm-ss')
      //   res.setHeader('Content-Disposition', `attachment; filename="${name}.xlsx"`);
      // res.sendFile(filePath, () => {
      //   fs.unlinkSync(filePath);
      // });

      const buffer = XLSXStyle.write(workbook, {
        type: 'buffer'
      });
      const name = 'Products_' + moment().format('YYYY-DD-MM_HH-mm-ss')

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${name}.xlsx"`);
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
      // res.json({
      //   status: 'ok',
      //   sheet,
      // })
    } catch (e) {
      next(e)
    }
  }

}

export default ExcelController;
