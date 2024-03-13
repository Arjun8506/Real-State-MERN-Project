import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import SignOut from '../components/SignOut';
import DeleteAccount from '../components/DeleteAccount';

const Profile = () => {

  const [formData, setformData] = useState({});
  const {authUser} = useAuthContext()

  const handleInputChage = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData);
  }

  return (
    <div>
      <div className=" p-4 max-w-lg mx-auto">
        <h1 className="font-bold uppercase text-2xl my-4 text-center ">
          PROFILE
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder= {authUser.username}
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="username"
            onChange={handleInputChage}
          />
          <input
            type="email"
            placeholder= {authUser.email}
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="email"
            onChange={handleInputChage}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="password"
            onChange={handleInputChage}
          />
          <button className="bg-green-600 py-2 rounded-lg hover:bg-green-500 uppercase font-bold"
          // disabled = {loading}
          >
            {/* {loading ? "LOADING..." : "Sign Up"} */}
            Update
          </button>
        </form>

        <div className='flex justify-between my-4 text-red-700 items-center'>
          <DeleteAccount />
          <SignOut />
        </div>

        {/* <p className="text-sm my-4 text-center ">
          Have an account already
          <Link
            to={"/signin"}
            className="underline mx-2 text-blue-500 hover:text-blue-300"
          >
            Go To SignIn
          </Link> */}
        {/* </p> */}

        {/* {error ? <p className="text-red-700">{error}</p>: ""} */}
      </div>
    </div>
  )
}

export default Profile