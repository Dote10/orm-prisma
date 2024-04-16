import { Router } from "express";
import { deleteArticleById,  getArticle,  getArticleById, getArticlesWithSequential,  } from "../controller/article.js";
import {  createArticleWithUserId, getArticles } from "../controller/users.js";

export const articleRouter = Router();



articleRouter.get('',getArticles);

articleRouter.post('',createArticleWithUserId);

articleRouter.get('/:id', getArticleById)

articleRouter.post('/multiple-articles', async (req, res) =>{
    await prisma.article.createMany({
        data: req.body
    });
    res.json({success:true});
});

//article update
articleRouter.put('/articles/:ids', async(req, res) =>{
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
articleRouter.delete('/:id', deleteArticleById)
