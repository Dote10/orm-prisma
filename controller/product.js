import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:['query']
});

export const getProduct = async (req,res) =>{
    const products = await prisma.product.findMany({
        include:{
            tag: true
        }
    });
    res.json(products);
}

export const createProduct = async (req,res) => {
    const products = await prisma.product.create({
        data:{
            ...req.body,
            tag :{
                create:req.body.tag
            }
        }
    })

    res.json(products);
}

export const createProductListByEmail = async (req,res) => {


    const productList = await prisma.seller.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            products: {
                create: req.body.products
            }
        }
    });

    res.json(productList);
}