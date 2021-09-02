import Navbar from "./Navbar"
import {load_user,checkAuthenticated} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
export default function Layout({children}) {
    const dispatch = useDispatch()
   useEffect(()=>{
       dispatch(load_user())
       dispatch(checkAuthenticated())
   },[])
    return (
        <>
        <div className="container">
        <Navbar />
        {children}
        </div>
        </>
    )
}