import {useRouter} from 'next/router'
import {useState,useEffect} from 'react'
function Message() {
    const [message,setMessage] = useState('')
    const router = useRouter()
    const {mid} = router.query
useEffect(()=>{
   
    if(mid === '23'){
        console.log(mid);
      setMessage('Confirm your email to activate your account. ')
    }else if(mid === '24'){
        console.log(mid);
        setMessage('We have sent you an email link to change password')
    }
},[mid,message])
    console.log(mid);
    console.log(message);
    return (
        <>
        <section className="messageContainer">
 <div className="welcome">
     <h1>{message}</h1>
     <div className="notGetLink">
         <p>Did't get email ...?</p>
         <button>Resend link</button>
     </div>
 </div>
            </section>
        </>
    );
}

export default Message;