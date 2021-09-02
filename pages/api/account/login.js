import cookie from 'cookie'
import axios from 'axios'
import {API_URL} from '../../../config/index'
export default async(req,res)=>{
    if(req.method === 'POST'){
        const {username,password} = req.body
        const body = JSON.stringify({username,password})
        console.log(body);
        try{
            const apiRes = await fetch(`${API_URL}/auth/jwt/create/`,{
                method : 'POST',
                headers:{
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                },
                body:body
            })
            const data = await apiRes.json()
            console.log(data);
            if(apiRes.status === 200){
                res.setHeader('Set-Cookie',[
                    cookie.serialize('access',data.access,{
                        httpOnly:true,
                        secure : false,
                        maxAge : 60 * 30,
                        sameSite: 'strict',
                        path : '/api/'
                    }
                    ),
                    cookie.serialize('refresh',data.refresh,{
                        httpOnly:true,
                        secure:false,
                        maxAge:60*60*24,
                        sameSite:'strict',
                        path: '/api/'
                    }
                    )
                ])
                return res.status(200).json({
                    success:'Logged in Successfully'
                })
            }else{
                return res.status(apiRes.status).json({
                    error:'Authentication failed'
                })
            }
        }catch(err){
              return res.status(500).json({
                  error: 'Something went wrong'
              })
        }

    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error: `Method ${req.method} is not allowed`
        })
    }
}