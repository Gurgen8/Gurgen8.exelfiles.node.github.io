import express from "express";
import ExcelController from "../controllers/ExcelController";
import multer from "multer";
const router = express.Router();


const upload = multer({
  storage: multer.memoryStorage(),
})

router.post('/parse', upload.single('file'), ExcelController.parse);

router.get('/export', ExcelController.export);



export default router;
