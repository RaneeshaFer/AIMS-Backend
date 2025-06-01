//console.log("Hi AIMS");
import express from  'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRouter from './routes/studentRoute.js'
import teacherRouter from './routes/teacherRoute.js';
import userRouter from './routes/userRoute.js';
import jwt from 'jsonwebtoken';
import cors from'cors';
import customerRouter from './routes/customerRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import itemRouter from './routes/itemRoute.js';
import orderRouter from './routes/orderRoute.js';


dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',userRouter)

//app.get('/',()=>{
   // console.log("HI AIMS");
//})
app.use((req,res,next)=>{
    let token=req.header("Authorization")
    
    if(token!=null){
        token=token.replace('Bearer ','')
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                res.json({error:err})
            }else{
                req.user=decoded;
            }
        })
        
    }
    next()
    
})
let mongoUrl=process.env.MONGO_URL


mongoose.connect(mongoUrl)


let connection=mongoose.connection;

connection.once('open',()=>{
    console.log("Connected")

})
app.listen(3000,()=>{
    console.log("server started on port 3000");
})

app.use('/api/student',studentRouter)
app.use('/api/customer',customerRouter)
app.use('/api/appointment',appointmentRouter)
app.use('/api/item',itemRouter)
app.use('/api/order',orderRouter)
app.use('/api/teacher',teacherRouter)


