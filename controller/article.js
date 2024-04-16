import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:['query']
})

export const getArticle = async (req,res) =>{
    //3.특정 조건에 부합하는 기사들 검색
    //(fetch all article in draft state)
    const articles = await prisma.article.findMany({
        where:{
            state:req.query.state
        }
    });

    res.json(articles);
}

export const getArticlesWithSequential = async (req, res) =>{
        const [articles,count] = await prisma.$transaction([
            prisma.article.findMany({
                where:{
                    state:"DRAFT"
                }
            }),
            prisma.article.count()
        ])

        res.json({articles,count});
}


export const getArticleById = async(req,res) =>{
    //2.특정 기사 하나 검색 
    const article = await prisma.article.findFirst({
        where: {
            id: +req.params.id
        }
    })

    res.json(article);
}

export const createArticleTogetherWithUser = async(req,res) => {
    const userAndArticle = await prisma.user.create({
        data:{
            email : req.body.email,
            name: req.body.name,
            article:{
                create: req.body.article
            }
        }
    });

    res.json(userAndArticle);
}

export const deleteArticleById = async (req,res) =>{
    const deleted = await prisma.article.delete({
        where:{
            id: +req.params.id
        }
    });

    res.json(deleted);
}

