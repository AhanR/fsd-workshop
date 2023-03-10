import express from "express";
import http from 'http'
import bodyParser from "body-parser";

const router = express();

router.use(bodyParser.json());
router.get("/", (req, res, next) => res.json({"hi":"hello"}));

http.createServer(router).listen(3000, ()=> console.log("server ready"));