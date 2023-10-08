const usermodel=require('../model/user.model')
const validator =require('email-validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const register=async (req,res)=>{
 try {
    const {email,name,password}=req.body;
    if(!email||!name||!password) return res.json({
        message:'All fields are required',
        flag:false
    });
    if(!validator.validate(email)) return res.json({
        message:"Incorrect e-mail",
        flag:false
    })
    const user=await usermodel.findOne({email});
    if(user) return res.json({
        message:'User already exist',
        flag:false
    });
    await usermodel.create({email,name,password});
    return res.status(200).json({
        message:"user has been created successfully",
        flag:true
    })
 } catch (error) {
    return res.status(400).json({
        flag:false,
        message:error.message
    })   
 }
};


const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password) 
        return res.json({
            message:'All fields are required',
            flag:false
        });
        if(!validator.validate(email)) return res.json({
            message:"Incorrect e-mail",
            flag:false
        })
        const user=await usermodel.findOne({email})
        if(!user) return res.json({
            message:"User not exist",
            flag:false
        })
        const result=await bcrypt.compare(password,user.password);
        if(!result) return res.json({
            message:"E-mail/password is wrong",
            flag:false
        })
        const token=await createjwttoken(user);
        return res.json({
            message:token,
            flag:true
        });
    } catch (error) {
        return res.status(400).json({
            flag:false,
            message:error.message
        })   
    }
}

const createjwttoken=async (data)=>{
    const token=await jwt.sign({userid:data['_id']},process.env.JWT_SECRET);
    return token;
}

const fetchjwttoken=async (token)=>{
    const data=await jwt.verify(token,process.env.JWT_SECRET);
    return data;
}
const getUser=async(req,res)=>{
    try {
        let {token}=req.body
        if(!token) return res.json({
            message:"something went wrong.Please login again",
            flag:false
        })
        let {userid}=await fetchjwttoken(token);
        const user=await usermodel.findById(userid);
        if(!user) return res.json({
            message:"something went wrong.Please login again",
            flag:false
        })
        const response={
            email:user.email,
            name:user.name
        }
        return res.json({
            message:response,
            flag:true
        })
    } catch (error) {
        return res.status(400).json({
            flag:false,
            message:error.message
        }) 
    }
}
module.exports={
    register,login,getUser
}