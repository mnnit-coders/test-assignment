const mongoose =require('mongoose');

const bcrypt=require('bcrypt')
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[1,"Name should have more than 1 characters"]
    },
    password:{
        type:String,
        required:true
    }
});

userschema.pre('save',async function(){
    let salt=await bcrypt.genSalt(10);
    let hash=await bcrypt.hash(this.password,salt)
    this.password=hash
})
const usermodel=mongoose.model('users',userschema)
module.exports=usermodel;
