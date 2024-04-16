import { Router } from 'express'
import { createArticleWithUserId, createProfile, createUser, createUsersWithInteractive, deleteUnPublishedArticle, getArticles, getArticlesByUserId, getUser } from '../controller/users.js';
import { createCart, getCart } from '../controller/cart.js';
import { createArticleTogetherWithUser } from '../controller/article.js';

export const userRouter = Router();

 userRouter.get('',getUser)

 userRouter.get('/:id',)

 userRouter.post('',createUsersWithInteractive)

 // profile
 userRouter.post('/:id/profiles',createProfile)

 // article
 userRouter.get('/articles',getArticles)

 userRouter.get('/:id/articles',getArticlesByUserId)

 userRouter.post('/articles',createArticleTogetherWithUser)

 userRouter.post('/:id/articles',createArticleWithUserId)
 
 userRouter.delete('/:id/articles',deleteUnPublishedArticle)

 //cart
 userRouter.get('/:userId/carts',getCart)

 userRouter.post('/:userId/carts',createCart)

