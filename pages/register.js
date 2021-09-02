import Link from 'next/link'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {register} from '../redux/actions'
import {useRouter} from 'next/router'
function Register() {
    const router = useRouter()
    const [dataSent,setDataSent] = useState(false)
    const [validate,setValidate] = useState({
        usernameValidate : false,
        emailValidate : false,
        passwordValidate : false,
        re_passwordValidate : false
    })
    const {usernameValidate,emailValidate,passwordValidate,re_passwordValidate} = validate
    const [formValues,setFormValues] = useState({
        username : '',
        email : '',
        password : '',
        re_password : ''
    })
   const {username,email,password,re_password} = formValues
   const regexPatters = {
       username: /^[a-z\d_]{6,15}$/,
       email: /^([\w]+)@([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
       password: /^[\w@-]{8,20}$/,
       re_password: /^[\w@-]{8,20}$/
   } 
   const onChange =e=>{
    setFormValues({
        ...formValues ,[e.target.name] : e.target.value,
        
    })
    if(regexPatters[e.target.name].test(e.target.value)){
        if(e.target.name === 're_password'){
            if(password === e.target.value){
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
          
        }else{
        e.target.className = 'valid'
       
        setValidate({
            ...validate ,[e.target.name+'Validate'] : true
        })
        }
    }else{
      e.target.className = 'invalid'
      setValidate({
          ...validate ,[e.target.name+'Validate'] : false
      })
      
    }
}
const selector = useSelector(state=>state.auth.register_success)
console.log(selector);
const dispatch = useDispatch()
const onSubmit =(e)=>{
    e.preventDefault()
    console.log(formValues);
    console.log(selector);
    dispatch(register(formValues))
    if(selector){
        router.push('/message/23')
    }
 }
 useEffect(()=>{
     if(selector){
         router.push('/message/23')
     }
 },[selector])
    return (
        <>
 <section className='register'>
     <div className="formDiv">
              <h1>Sign Up</h1>
              <form onSubmit={onSubmit} action="">
                  <input
                       type="text"
                       placeholder='Username'
                       name='username'
                       value={username}
                       onChange={onChange}
                        />
                  <input 
                       type="email"
                       name="email"
                       placeholder='Email'
                       value={email}
                       onChange={onChange}
                        />
                  <input 
                       type="password"
                       name="password"
                       placeholder='Password'
                       value={password}
                       onChange={onChange}
                        />
                  <input
                       type="password"
                       name="re_password" 
                       placeholder='Password Confirm' 
                       value={re_password}
                       onChange={onChange}
                       />
{usernameValidate && emailValidate && passwordValidate && re_passwordValidate ? (
   <input type="submit"  value="Sign Up"  className='loginbtn' />
):(<input type="submit" disabled value="Sign Up"  className='loginbtn invalidd' />)}
                 
              </form>
              <div className="already login">
                  <p>Already a User</p> <Link  href='/login'><a className='userOrnot'>Login</a></Link>
              </div>
              </div>
           </section>
        </>
    );
}

export default Register;