import express from "express"
import * as dotenv from 'dotenv'
process.env.NODE_ENV == 'prod'?
                dotenv.config({path:'./.env.prod'})
                : dotenv.config({path:'./.env.local'});

import bodyParser from "body-parser";
import { userRouter } from "./routers/users.js"
import { productRouter } from "./routers/product.js";
import { articleRouter } from "./routers/article.js";


const app = express()

app.use(bodyParser.json())



//에러처리기
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(200).send("에러가 발생했습니다.");
})


//라우터 등록
app.use('/articles',articleRouter);
app.use('/users',userRouter);
app.use('/products',productRouter)


app.get('/',(req,res) =>{
    res.send("Hello prisma");
});

app.listen(7500, () => {
    console.log("App working");
});