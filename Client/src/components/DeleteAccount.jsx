import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';

const DeleteAccount = () => {

  const [error, seterror] = useState(null);
    const {authUser, setauthUser} = useAuthContext()

    const handleDeleteAccount = async () =>{
        try {
            const res = await fetch("/api/auth/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({authUser})
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
    <button type='button' className='bg-zinc-900 font-bold p-2 rounded-lg text-red-500 hover:opacity-50'
    onClick={handleDeleteAccount}
    >DeleteAccount</button>
  )
}

export default DeleteAccount