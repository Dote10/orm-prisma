import { Router } from 'express'
import { createArticleWithUserId, createProfile,  createUsersWithInteractive, deleteUnPublishedArticle, getArticlesByUserId, getArticlesWithCount, getUser } from '../controller/users.js';
import { createCart, getCart } from '../controller/cart.js';
import { createArticleTogetherWithUser, getArticleByUserIdWithRawQuery } from '../controller/article.js';

export const userRouter = Router();

 userRouter.get('',getUser)

 userRouter.get('/:id',)

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
 
 userRouter.delete('/:id/articles',deleteUnPublishedArticle)

 //cart
 userRouter.get('/:userId/carts',getCart)

 userRouter.post('/:userId/carts',createCart)

