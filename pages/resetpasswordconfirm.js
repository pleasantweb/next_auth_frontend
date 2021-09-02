import {useState} from 'react'
function Resetpasswordconfirm() {
    const [formVal,setFormVal] = useState({
        new_password:'',
        re_new_password:'',
        new_passwordValid: false,
        re_new_passwordValid : false
    })
    const {new_password,re_new_password,new_passwordValid,re_new_passwordValid} = formVal
    const regexPatters = {
        new_password: /^[\w@-]{8,20}$/,
        re_new_password: /^[\w@-]{8,20}$/
    } 

    const onChange=(e)=>{
        setFormVal(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
        if(regexPatters[e.target.name].test(e.target.value)){
            if(e.target.name === 're_new_password'){
                if(new_password === e.target.value){
                  e.target.className = 'valid'
                  setFormVal(prev=>({
                      ...prev,
                      [e.target.name+'Valid']:true
                  }))
                }else{
                  e.target.className = 'invalid'
                  setFormVal(prev=>({
                    ...prev,
                    [e.target.name+'Valid']:false
                }))
                }
              
            }else{
            e.target.className = 'valid'
           
            setFormVal(prev=>({
                ...prev,
                [e.target.name+'Valid']:true
            }))
            }
        }else{
          e.target.className = 'invalid'
          setFormVal(prev=>({
            ...prev,
            [e.target.name+'Valid']:false
        }))
          
        }
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(formVal);
        // let uid = match.params.uid
        // let token = match.params.token
       
    }
    return (
        <>
<section className='resetPass confirm'>
           <h1>Enter New Password</h1>
           <form onSubmit={onSubmit} action="">
               <input onChange={onChange}  value={new_password} type="password" name="new_password"  placeholder='Password' />
               <input onChange={onChange} value={re_new_password} type="password" name="re_new_password" placeholder='Password Confirm' />
               {new_passwordValid && re_new_passwordValid ? (
                   <input className='btnEnabled' type="submit" value="Save" />
               ):(<input disabled className='btnDisabled' type="submit" value="Save" />)}
               
           </form>
       </section>

        </>
    );
}

export default Resetpasswordconfirm;