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

app.get('/articles', async (req,res) =>{
    //3.특정 조건에 부합하는 기사들 검색
    //(fetch all article in draft state)
    const articles = await prisma.article.findMany({
        where:{
            state:req.query.state
        }
    });

    res.json(articles);

});

app.get('/articles', async(req,res) =>{
    //1.모든 기사 검색하기 
    const articles = await prisma.article.findMany();
    res.json(articles);
})


app.get('/articles/:id', async(req,res) =>{
    //2.특정 기사 하나 검색 
    const article = await prisma.article.findFirst({
        where: {
            id: +req.params.id
        }
    })

    res.json(article);
})


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

//article update
app.put('/articles/:ids', async(req, res) =>{
const idList = req.params.ids.split(',').map(id => +id);
const updatedCount = await prisma.article.updateMany({
   where:{
       id:{
           in : idList
       }
   },
   data:{
       title: req.body.title
   }
});
    res.json(updatedCount);
});

//article delete
app.delete('/articles/:id', async (req,res) =>{
    const deleted = await prisma.article.delete({
        where:{
            id: +req.params.id
        }
    });

    res.json(deleted);
})

app.listen(7500, () => {
    console.log("App working");
});