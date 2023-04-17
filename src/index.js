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
    res.send("<a href = '/download/"+req.file.filename+"'>"+req.file.filename+" download file here</a>");
});
router.get("/download/:id", async (req, res, next)=> {
    // let name = null;
    await db.get("SELECT file_name as FN, file_id as Fid FROM File WHERE file_id = '"+req.params.id+"'", (e,row)=>{
        // console.log(row.FN);
        console.log(row);
        if(row !== undefined) res.download('/files/'+req.params.id,row.FN,{root: process.cwd()});
        else res.send('<h2>Invalid File Id</h2>');

    });
})
router.use(express.static(process.cwd()+'/public'));

http.createServer(router).listen(3000, ()=> {
    db.run("CREATE TABLE File( file_id varchar(40), file_name varchar(40))");
    console.log("server ready");
});