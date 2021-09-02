import {useRouter} from 'next/router'
import {verify} from '../../redux/actions'
import {useDispatch,useSelector} from 'react-redux'
import {useEffect} from 'react'
function Activation() {
    const dispatch = useDispatch()
    const selector = useSelector(state=>state.auth.isAccountActivated)
    const router = useRouter()
    const {uuid} = router.query
    console.log(uuid);
    const onVerify =()=>{
        console.log('done');
        const uid = uuid[0]
        const token = uuid[1]
        console.log(uid,token);
        dispatch(verify(uid,token))
        if(selector){
            router.push('/login')
        }
    }
    useEffect(()=>{
        if(selector){
            router.push('/login')
        }
    },[selector])
    return (
        <>
<section className='activation'>
         <button onClick={onVerify} className='activatebtn'>Activate Your Account</button>
       </section>
        </>
    );
}

export default Activation;