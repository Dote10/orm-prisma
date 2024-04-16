import { Router } from "express";
import { createProduct, createProductListByEmail, getProduct } from "../controller/product.js";

export const productRouter = Router();

productRouter.get('',getProduct);

productRouter.post('',createProduct);

productRouter.post('/list',createProductListByEmail);

