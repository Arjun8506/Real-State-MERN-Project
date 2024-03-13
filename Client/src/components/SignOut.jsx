import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext'

const SignOut = () => {
  const [error, seterror] = useState(null);
    const {setauthUser} = useAuthContext()

    const handleSignOut = async () =>{
        try {
            const res = await fetch("/api/auth/signout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
            })
            const data = await res.json()
            if(data.success === false) return
            localStorage.removeItem("chat-user")
            setauthUser(null)
            alert(data.message)
        } catch (error) {
            seterror(error.message);
            alert(error)
        }
    }
    
  return (
    <button type='button' className='bg-zinc-900 font-bold p-2 rounded-lg text-blue-500 hover:opacity-50' 
    onClick={handleSignOut}
    >SignOut</button>
  )
}

export default SignOut