import express from "express"
import * as dotenv from 'dotenv'
process.env.NODE_ENV == 'prod'?
                dotenv.config({path:'./.env.prod'})
                : dotenv.config({path:'./.env.local'});

import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client"

const app = express()

const prisma = new PrismaClient({
    log:["query"]
})

app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.send("Hello prisma");
});

app.post('/articles', async (req, res) =>{
    await prisma.article.create({
        data : req.body 
    });
    res.json({success:true});
});

app.post('/multiple-articles', async (req, res) =>{
    await prisma.article.createMany({
        data: req.body
    });
    res.json({success:true});
});

app.listen(7500, () => {
    console.log("App working");
});