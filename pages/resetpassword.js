import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {password_reset} from '../redux/actions'
import {useRouter} from 'next/router'
function Resetpassword() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [formVal,setFormVal] = useState({
        email:'',
        emailIsValid: false
      })
      const {email,emailIsValid} = formVal
      const regexPatters = {
        email: /^([\w]+)@([a-z]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
      }
    const onChange =(e)=>{
         setFormVal({
            ...formVal,email:e.target.value
         })
         console.log(regexPatters[e.target.name]);
         if(regexPatters[e.target.name].test(e.target.value)){
            
            e.target.className = 'valid'
           setFormVal(prev=>({
               ...prev,emailIsValid:true
           }))
           
        }else{
          e.target.className = 'invalid'
          setFormVal(prev=>({
            ...prev,emailIsValid:false
        }))
       
        }
       
    }
    const selector = useSelector(state=>state.auth.email_sent)
    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(formVal);
       dispatch(password_reset(email))
       if(selector){
           router.push('/message/24')
       }
    }
    useEffect(()=>{
        if(selector){
            router.push('/message/24')
        }
    },[selector])
    return (
        <>
 <section className='resetPass'>
            
            <h1>Enter your Registered Email Address</h1>
            <form onSubmit={onSubmit} action="">
                <input  onChange={onChange} value={email} type="email" name="email" id="" />
                {emailIsValid ? (
                    <input className='btnEnabled' type="submit" value="Send" />
                ) : (<input disabled className='btnDisabled' type="submit" value="Send" />)}
               
            </form>
        </section>
        </>
    );
}

export default Resetpassword;