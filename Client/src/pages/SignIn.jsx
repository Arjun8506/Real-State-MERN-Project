import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const SignIn = () => {

  const [formData, setformData] = useState({});

  const handleInputChage = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const { authUser, setauthUser } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setloading(false);
        seterror(data.message);
        return;
      }
      setloading(false);
      seterror(null);
      
      localStorage.setItem("chat-user", JSON.stringify(data))
      setauthUser(data)

    } catch (error) {
      setloading(false);
      seterror(error.message);
    }
  };

  return (
    <div>
      <div className=" p-4 max-w-lg mx-auto">
        <h1 className="font-bold uppercase text-2xl my-4 text-center ">
          Sign In
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="email"
            onChange={handleInputChage}
          />
          <input
            type="password"
            placeholder="password"
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="password"
            onChange={handleInputChage}
          />
          <button className="bg-green-600 py-2 rounded-lg hover:bg-green-500 uppercase font-bold"
          disabled = {loading}
          >
            {loading ? "LOADING..." : "Sign In"}
            {/* Sign In */}
          </button>
        </form>

        <p className="text-sm my-4 text-center ">
          Dont Have an Account 
          <Link
            to={"/signup"}
            className="underline mx-2 text-blue-500 hover:text-blue-300"
          >
            Go To SignUp
          </Link>
        </p>

        {error ? <p className="text-red-700 text-center">{error}</p>: ""}
      </div>
    </div>
  )
}

export default SignIn