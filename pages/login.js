import Link from 'next/link'
import {useState,useEffect} from 'react'
import {login} from '../redux/actions'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router'
function Login() {
  const router = useRouter()
  const [message,setMessage]= useState('')
    const [validate,setValidate] = useState({
        usernameValidate : false,        
        passwordValidate : false    
    })
    const {usernameValidate,passwordValidate} = validate
    const [formValues,setFormValues] = useState({
        username : '',  
        password : ''
       
    })
   const {username,password} = formValues
   const regexPatters = {
       username: /^[a-z\d_]{6,15}$/,   
       password: /^[\w@-]{8,20}$/
       
   } 
   const onChange =e=>{
         setFormValues({
             ...formValues ,[e.target.name] : e.target.value,
             
         })
         if(regexPatters[e.target.name].test(e.target.value)){
           
             e.target.className = 'valid'
            
             setValidate({
                 ...validate ,[e.target.name+'Validate'] : true
             })
             
         }else{
           e.target.className = 'invalid'
           setValidate({
               ...validate ,[e.target.name+'Validate'] : false
           })
           
         }
   }
   const selector = useSelector(state=>state.auth.isAuthenticated)
   const dispatch = useDispatch()
   const onSubmit =(e)=>{
    e.preventDefault()  
    console.log(formValues);
    dispatch(login(formValues))
    if(selector){
      router.push('/')
    }else{
        setTimeout(()=>{
            setMessage('Please enter valid username or password')
        },2000)
        
    }
}
useEffect(()=>{
    
    if(selector){
        router.push('/')
      }
},[selector])

const isAccountActivated = useSelector(state=>state.auth.isAccountActivated)
useEffect(()=>{
   if(isAccountActivated){
       setMessage('Your account is created successfully , please login to continue')
   }
},[isAccountActivated,message])
return (
        <>
<section className='login'>
    {message !== '' ? (
        <div className="message">
        <p>{message}</p>
    </div>
    ): ('')}
    <div className="formDiv">
               <h1>Log In</h1>
               <form onSubmit={onSubmit}  action="">
                   <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChange}
                         />
                  
                   <input 
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={onChange}
                         />
                  
{usernameValidate &&  passwordValidate ? (
    <input type="submit"  value="Log In"  className='loginbtn' />
):(<input type="submit" disabled value="Log In"  className='loginbtn invalidd' />)}
                   
               </form>
               <div className="already">
                  <p>Not a User </p> <Link  href='/register'><a className='userOrnot' > Signup</a></Link>
              </div>
              <div className="forgot">
                  <Link  href='/resetpassword'><a className='forgotlink'>Forgot Password</a></Link>
              </div>
              </div>
            </section>
           
        </>
    );
}

export default Login;