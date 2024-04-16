import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:['query']
})

export const getCart = async (req,res) =>{
    const user = await prisma.user.findFirstOrThrow({
        where : {
            id: + req.params.userId
    }
    });


    const cart = await prisma.cart.findMany({
        where:{
            userId : user.id
        },
        include:{
            product:true
        }
    })

    res.json(cart);
}

export const createCart = async (req,res) =>{
    // 1. 사용자 정보 확인
    const user = await prisma.user.findFirstOrThrow(
        {
            where:{
                id : +req.params.userId
            }
        })

    // 2. 제품 정보 얻기
    const product = await prisma.product.findFirstOrThrow({
        where:{
            id: req.body.product
        }
    })

    // 3. 데이터 구조화 하고 cart 데이터 만들기 
    const cart = await prisma.cart.create({
       data:{
        quantity: req.body.quantity,
        userId: user.id,
        productId: product.id
       }
    });

    res.json(cart);
}