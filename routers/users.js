import { Router } from 'express'
import { createArticle, createProfile, createUser, deleteUnPublishedArticle, getArticles, getArticlesByUserId, getUser } from '../controller/users.js';

export const userRouter = Router();

 userRouter.get('',getUser)

 userRouter.get('/:id',)

 userRouter.post('',createUser)

 // profile
 userRouter.post('/:id/profiles',createProfile)

 // article
 userRouter.get('/articles',getArticles)

 userRouter.get('/:id/articles',getArticlesByUserId)

 userRouter.post('/:id/articles',createArticle)
 
 userRouter.delete('/:id/articles',deleteUnPublishedArticle)

