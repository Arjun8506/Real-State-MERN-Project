import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setformData] = useState({});

  const handleInputChage = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterror(data.message);
        return;
      }
      setloading(false);
      seterror(null);
      navigate("/signin");
    } catch (error) {
      setloading(false);
      seterror(error.message);
    }
  };

  return (
    <div>
      <div className=" p-4 max-w-lg mx-auto">
        <h1 className="font-bold uppercase text-2xl my-4 text-center ">
          Sign Up
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="p-2 focus:outline-none border-2 rounded-lg"
            id="username"
            onChange={handleInputChage}
          />
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
            {loading ? "LOADING..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm my-4 text-center ">
          Have an account already
          <Link
            to={"/signin"}
            className="underline mx-2 text-blue-500 hover:text-blue-300"
          >
            Go To SignIn
          </Link>
        </p>

        {error ? <p className="text-red-700">{error}</p>: ""}
      </div>
    </div>
  );
};

export default SignUp;
