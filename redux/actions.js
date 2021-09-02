import {
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
    USER_ACTIVATION_SUCCESS,
    USER_ACTIVATION_FAILED,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    USER_AUTHENTICATED_SUCCESS,
    USER_AUTHENTICATED_FAILED,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED
} from './types'
import axios from 'axios'
import {API_URL} from '../config/index'
export const load_user =()=> async dispatch=>{    
       try{
        const res = await fetch('api/account/user',{
            method:'GET',
            headers: {
                'content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        })
        console.log(res);
        const data = await res.json()
        console.log(data);
        if(res.status === 200){
           dispatch({
               type: USER_LOADED_SUCCESS,
               payload : data.user
           }) 
        }else{
            dispatch({
                type : USER_LOADED_FAILED
            })
        }
       }catch(err){
          dispatch({
              type : USER_LOADED_FAILED
          })
       }

   
}

export const register =({username,email,password,re_password})=>async dispatch=>{
    const config ={
        headers:{
            'content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({username,email,password,re_password})

     try{
        const res = await axios.post(`${API_URL}/auth/users/`,body,config)
        console.log(res);
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : res.data             
        })
     }catch(err){
         dispatch({
           type : USER_REGISTER_FAILED
        })
    }
}

export const verify = (uid,token)=> async dispatch=>{
    const config = {
        headers : {
            'content-Type' : 'application/json'
        }
    }
    const body = JSON.stringify({uid,token})
    console.log(body);
    try{
      await axios.post(`${API_URL}/auth/users/activation/`,body,config)
        dispatch({
            type : USER_ACTIVATION_SUCCESS,
            message : 'Your Account is Activated. Please Login to Continue.'
        })
    }catch(err){
         dispatch({
             type : USER_ACTIVATION_FAILED,
             message: 'Something went wrong , maybe your link is expired.'
         })
    }
}

export const login =({username,password})=>async dispatch=>{
    
    // const config ={
    //     headers:{
    //         'content-Type': 'application/json'
    //     }
    // }
    const body = JSON.stringify({username,password})
console.log(body);

     try{
    //    const res=  await axios.post(`api/account/login/`,body,config)
       const res=  await fetch('api/account/login',{
           method:'POST',
           headers:{
            'content-Type': 'application/json',
            'Accept':'application/json'
        },
        body:body

       })
       console.log(res);
       
        dispatch({
            type : USER_LOGIN_SUCCESS,
            // payload : res.data
        })
        dispatch(load_user())
     }catch(err){
         dispatch({
           type : USER_LOGIN_FAILED
        })
    }
}

export const logout = ()=>async dispatch=>{
    try{
        const res = await fetch('api/account/logout',{
            method:'POST'
        })
        dispatch({
            type : USER_LOGOUT_SUCCESS
        })
    }catch(err){
        dispatch({
            type : USER_LOGOUT_FAILED
        })
    }
    
}

export const checkAuthenticated =()=>async dispatch=>{
    
        try{
         const res = await fetch('api/account/verify',{
             method:'GET',
             headers : {
                'content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
         })
          console.log(res);
         if(res.status === 200){
            dispatch({
                type: USER_AUTHENTICATED_SUCCESS
                
            })
         }else{
            dispatch({
                type : USER_AUTHENTICATED_FAILED
            })
         }
         
        }catch(err){
           dispatch({
               type : USER_AUTHENTICATED_FAILED
           })
        }
 
    
}

export const password_reset=(email)=>async dispatch=>{
    const config = {
        headers:{
            'content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email})
    try{
       await axios.post(`${API_URL}/auth/users/reset_password/`,body,config)
       dispatch({
           type:PASSWORD_RESET_SUCCESS
       })
    }catch(err){
        dispatch({
            type: PASSWORD_RESET_FAILED
        })
    }
}

export const password_reset_confirm=(uid,token,new_password,re_new_password)=>async dispatch=>{
    const config = {
        headers:{
            'content-Type':'application/json'
        }
    }
    const body = JSON.stringify({uid,token,new_password,re_new_password})
    try{
        await axios.post(`${API_URL}/auth/users/reset_password_confirm/`,body,config)
        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        })
     }catch(err){
         dispatch({
             type: PASSWORD_RESET_CONFIRM_FAILED
         })
     }
}