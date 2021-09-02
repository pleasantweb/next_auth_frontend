import {useRouter} from 'next/router'
import {verify} from '../redux/actions'
import {useDispatch} from 'react-redux'
function Activation() {
    const dispatch = useDispatch()
    const router = useRouter()
    const {uid,token} = router.query
    console.log(uid,token);
    const onVerify =()=>{
        console.log('done');
        // const uid = match.params.uid
        // const token = match.params.token
        dispatch(verify(uid,token))
        // verify(uid,token)
        // if(IsActivated){
        //     return <Redirect to='/' />
        // }
    }
    return (
        <>
<section className='activation'>
         <button onClick={onVerify} className='activatebtn'>Activate Your Account</button>
       </section>
        </>
    );
}

export default Activation;