import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import multer from 'multer'
import sqlite3 from "sqlite3";

const router = express();
const upload = multer({dest:"files/"})
const sqlite = sqlite3.verbose();
const db = new sqlite.Database(':memory:');

router.use(bodyParser.json());
router.post("/", upload.single('file') ,(req, res, next) => {
    console.log(req.file.filename)
    db.run("INSERT INTO File VALUES ('"+req.file.filename+"','"+req.file.originalname+"')");
    res.json({fileId : req.file.filename, filename: req.file.originalname})
});
router.use(express.static(process.cwd()+'/public'));

http.createServer(router).listen(3000, ()=> {
    db.run("CREATE TABLE File( file_id varchar(40), file_name varchar(40))");
    console.log("server ready");
});