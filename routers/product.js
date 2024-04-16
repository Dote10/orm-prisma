import { Router } from "express";
import { createProduct, getProduct } from "../controller/product.js";

export const productRouter = Router();

productRouter.get('',getProduct);

productRouter.post('',createProduct);

