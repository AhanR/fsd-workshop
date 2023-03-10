import express from "express";
import http from 'http';
import bodyParser from "body-parser";
import path from "path";

const router = express();

router.use(bodyParser.json());
router.get("/ping", (req, res, next) => res.json({"hi":"hello"}));
router.use(express.static(process.cwd()+'/public'));

http.createServer(router).listen(3000, ()=> console.log("server ready"));