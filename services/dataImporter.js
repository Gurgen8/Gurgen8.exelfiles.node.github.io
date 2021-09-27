import XLSX from "xlsx";
import _ from "lodash";
import Promise from "bluebird";
import arrayBufferToBuffer from "arraybuffer-to-buffer";
import Excel from "../models/Excel";
import { isMainThread, parentPort, workerData } from "worker_threads";

async function main() {
  const workbook = XLSX.read(arrayBufferToBuffer(workerData.buffer));
  const { Sheets } = workbook;
  const sheet = Object.values(Sheets)[0]

  const data = XLSX.utils.sheet_to_json(sheet).map(datum => {
    delete datum.ID;
    return datum;
  });


  const dataGroup = _.chunk(data, 50);
  parentPort.postMessage({
    loading: 0
  })
  let i = 1;
  for (const dataList of dataGroup) {
    await Promise.map(dataList, async (d) => {
      await Excel.create(d);
      parentPort.postMessage({
        loading: i / data.length * 100
      });
      i++;
    })
  }

  // parentPort.postMessage(data)

  process.exit(0);
}

main().catch(e => {
  throw e
})
