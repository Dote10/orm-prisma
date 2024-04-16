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