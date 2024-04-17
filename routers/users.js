import { Router } from 'express'
import { createArticleWithUserId, createProfile,  createUsersWithInteractive, deleteUnPublishedArticle, getArticlesByUserId, getArticlesWithCount, getSenderInfoByUserId, getUser } from '../controller/users.js';
import { createCart, getCart } from '../controller/cart.js';
import { createArticleTogetherWithUser, getArticleByUserIdWithRawQuery } from '../controller/article.js';

export const userRouter = Router();

//user
//get
 userRouter.get('',getUser)

 userRouter.get('/:id',)

 userRouter.get('/:id/sender/info',getSenderInfoByUserId)

 //post
 userRouter.post('',createUsersWithInteractive)

 // profile
 userRouter.post('/:id/profiles',createProfile)

 // article
 
 //get
 userRouter.get('/articles',getArticlesWithCount)

 //getArticlesByUserId
 userRouter.get('/:id/articles',getArticleByUserIdWithRawQuery)

 //post
 userRouter.post('/articles',createArticleTogetherWithUser)

 userRouter.post('/:id/articles',createArticleWithUserId)
 
 //delete
 userRouter.delete('/:id/articles',deleteUnPublishedArticle)

 //cart
 userRouter.get('/:userId/carts',getCart)

 userRouter.post('/:userId/carts',createCart)

