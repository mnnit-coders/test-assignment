import axios from 'axios'
const Swal=require('sweetalert2')

const API_URL='https://sg-backend-2c7v.onrender.com/api'
let apifunctions={
   signup:async (email,name,password)=>{
    try {
       const result=await axios.post(`${API_URL}/register`,{
        email,name,password
       }) 
       if(!result.data.flag){
        return Swal.fire(
            result.data.message,
            'Something went wrong',
            'error'
          )
       }
       return Swal.fire(
        result.data.message,
        'Great!!! 😀',
        'success'
       )
    } catch (error) {
        return Swal.fire(
            error.message,
            'Something went wrong',
            'error'
          )
    }
   },
   login:async(email,password)=>{
        try {
            const result=await axios.post(`${API_URL}/login`,{
                email,password
            })
            // console.log(result.data)
            if(!result.data.flag){ Swal.fire(
                result.data.message,
                'something went wrong',
                'error'
            )
            return {token:"",flag:false};
        }
        return {token:result.data.message,flag:true};
        } catch (error) {
            // console.log(error.message)
            Swal.fire(
                error.message,
                'Something went wrong',
                'error'
            )
            return {token:"",flag:false};
        }
   },
   getuser:async (token)=>{
       try {
        const result=await axios.post(`${API_URL}/user`,{
            token:token.token
        })
        // console.log(result)
        if(!result.data.flag) { Swal.fire(
            result.data.message,
            'Something went wrong',
            'error'
          )
          return {data:"",flag:false};
        }
        return {data:result.data.message,flag:true};
    } catch (error) {
        Swal.fire(
            error.message,
            'Something went wrong',
            'error'
        )
        return {data:"",flag:false};
    }
   }
}

export default apifunctions
