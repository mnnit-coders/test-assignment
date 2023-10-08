const express=require('express')
const app=express()
const cors=require('cors')
const bodyparser=require('body-parser');
const userRoute = require('./route/user.route');
require('dotenv').config();
app.use(cors({
    origin:'*',
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json());
const db=require('./model/db')

app.use('/api',userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})