import Head from 'next/head'
import Image from 'next/image'
import {useSelector} from 'react-redux'

export default function Home() {
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const userData = useSelector(state=>state.auth.user)
  console.log(userData);
  return (
 <>
<section className="homeContainer">
 <div className="welcome">


    <h1>{isAuthenticated && userData !== null &&  userData !== undefined ? ('Welcome '+ userData.username) : ('Please login to continue')}</h1>
    <h2>HttpOnly Cookie Authentication with Django, Djoser, Next Js and Redux .</h2>
    </div>
    </section>

    
  </>
  )
}
