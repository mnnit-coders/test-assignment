import axios from 'axios'
const Swal=require('sweetalert2')

const API_URL='http://localhost:8000/api'
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
            if(!result.data.flag) return Swal.fire(
                result.data.message,
                'something went wrong',
                'error'
            )
            return result.data.message;
        } catch (error) {
            return Swal.fire(
                error.message,
                'Something went wrong',
                'error'
              )
        }
   },
   getuser:async (token)=>{
    try {
        const result=await axios.post(`${API_URL}/user`,{
            token
        })
        if(!result.data.flag)  return Swal.fire(
            result.data.message,
            'Something went wrong',
            'error'
          )
          return result.data.message
    } catch (error) {
        return Swal.fire(
            error.message,
            'Something went wrong',
            'error'
          )
    }
   }
}

export default apifunctions