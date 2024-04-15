import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({
    log:['query']
});

//user
export const getUser = async (req,res) => {
    const users = await prisma.user.findMany({
        include:{
            profile :true
        }
    });
    res.json(users);
}

export const getUserId = async (req, res) => {
    const user = await prisma.user.findUnique({
        where:{
            id:req.params.id
        },
        include:{
            profile:true
        }
    });

    res.json(user);
}

export const createUser = async (req,res) => {
    const user = await prisma.user.create({
        data : req.body
    });
    res.json(user);
}

//profile
export const createProfile = async (req, res)=> {
    
    // 1. 사용자 정보를 가져오고
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id: +req.params.id
        },
    });
    
    // 2. 데이터를 구성하고
    const data = {
        ...req.body,
        userId: user.id
    }

    // 3. 프로파일을 만든다. 
    const profile = await prisma.profile.create({data});
    
    res.json(profile);
}

//articles

/**
 * 1. 모든 user와 article 가져오기
 * 2. user와 발행된 article 가져오기
 * @param {*} req 
 * @param {*} res 
 */
export const getArticles = async (req, res) => {
    const where = {
        state: req.query.state? req.query.state: ('DRAFT'||'PUBLISHED')
    };

    const articleAndCount = await prisma.user.findMany({
        include:{
            articles:{
                where
        },
            _count:{
                select:{
                    articles:{
                        where
                    }
                }
            }
        }
    });
    
    res.json(articleAndCount);
}


export const getArticlesByUserId = async (req, res) =>{
    const articles = await prisma.user.findMany({
    where:{
        id: +req.params.id,


    },
    include:{
        profile: true,
        articles: true
    }});

    if(!user){
        res.status(404).send("해당하는 사용자가 존재하지 않습니다. ")
    }

    res.json(articles)
}

 //3. 특정 user의 발행되지 않은 article 삭제하기 
 export const deleteUnPublishedArticle = async (req,res) => {
    
    const user = await prisma.user.findUnique({
        where:{
            id: +req.params.id
        }});

    if(!user){
        res.status(404).send("해당하는 사용자가 존재하지 않습니다. ")
    }
    
    const deletedCount = await prisma.article.deleteMany({
        where :{
            userId: user.id,
            state : req.query.state ? req.query.state : 'DRAFT' && 'PUBLISHED'
          }
    });

    res.json(deletedCount);
 }


export const createArticle = async (req, res) =>{

    const user = await prisma.user.findUnique({where:{
        id: +req.params.id
    }})

    if(!user){
        throw Error("해당하는 사용자가 존재하지 않습니다.");
    }

    const data = {
        ... req.body,
        userId:user.id
    }

    const article = await prisma.article.create({
        data
    });

    res.json(article);
}