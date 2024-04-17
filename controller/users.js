import { PrismaClient } from "@prisma/client";
import {z} from 'zod';

const ArticleCreateSchema = z.object({
    title: z.string().max(10),
    content: z.string().max(1000),
    state: z.enum(["DRAFT","PUBLISHED"]),
    userId:z.number()
})

const prisma = new PrismaClient({
    log:['query']
}).$extends({
    query:{
        article:{
            create:({args, query}) =>{
                args.data = ArticleCreateSchema.parse(args.data)
                return query(args)
            }
        }
    },
    result:{
        profile:{
            deliverySenderInfo:{
                need:{
                    name: true,
                    addr: true,
                    phone: true
                },
                compute:(profile) => {
                    const {name, addr, phone} = profile;
                    return `${name} ${addr} ${phone}`;
                }
            }
        }
    }
})



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

export const getSenderInfoByUserId = async(req,res) =>{
    const deliverySenderInfo = await prisma.profile.findFirst({
        where:{
        userId: +req.params.id
    }
});
    res.json(deliverySenderInfo);
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
export const getArticlesWithCount = async (req, res) => {
    const where = {
        state: req.query.state? req.query.state: {in:['DRAFT','PUBLISHED']}
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


export const createArticleWithUserId = async (req, res) =>{
    try{
        const user = await prisma.user.findFirst({where:{
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
    }catch(err){
       console.log(err);
      res.status(403).json(err);
    }
   
}

export const createUsersWithInteractive = async (req,res) =>{
   const user = await prisma.$transaction( async (tx)=>{
        let user = await tx.user.findFirst({
            where:{
                email: req.body.email
            }
        });

        if(user){
            throw new Error('해당 email은 이미 가입한 회원이 존재합니다.');
        }

        user = await tx.user.create({
            data:{
                email: req.body.email,
                name : req.body.name
            }
        });

        const profile = await tx.profile.create({
            data:{
                ...req.body.profile,
                userId:user.id
            }
        })

        return {...user, profile}
    });

    res.json(user);
}
