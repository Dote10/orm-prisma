import { Router } from 'express'
import { createArticle, createProfile, createUser, deleteUnPublishedArticle, getArticles, getArticlesByUserId, getUser } from '../controller/users.js';
import { createCart, getCart } from '../controller/cart.js';

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

 //cart
 userRouter.get('/:userId/carts',getCart)

 userRouter.post('/:userId/carts',createCart)

