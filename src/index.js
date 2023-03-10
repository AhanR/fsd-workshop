import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import path from "path";
import multer from 'multer'

const router = express();
const upload = multer({dest:"files/"})

router.use(bodyParser.json());
router.post("/", upload.single('file') ,(req, res, next) => {
    console.log(req.file.filename)
    res.json({fileId : req.file.filename})
});
router.use(express.static(process.cwd()+'/public'));

http.createServer(router).listen(3000, ()=> console.log("server ready"));