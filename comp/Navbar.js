import Link from 'next/link'
import {useSelector} from 'react-redux'
import {logout} from '../redux/actions'
import {useDispatch} from 'react-redux'
function Navbar() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
   const onLogout =()=>{
       dispatch(logout())
   }
    return (
        <>
           <nav>
               <div className="logo">
                   <Link href='/' >
                       <a className='homeLink'>Pleasant Web</a>
                   {/* <p>Pleasant Web</p> */}
                   </Link>
                   
                   </div>
                   <div className="navMenu">
                       <ul>
                           <li>Blog</li>
                           <li>Contact</li>
                           <li>About</li>
                           {isAuthenticated ? (
                            <li onClick={onLogout}>LogOut</li>
                           ): (
                             <li><Link href='/login'><a>Login</a></Link></li>
                           )}
                               
                           
                       </ul>
                   </div>
              
           </nav>
        </>
    );
}

export default Navbar;