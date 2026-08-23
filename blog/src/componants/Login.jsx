import React from "react";
import { Link, useNavigate } from "react-router-dom"; //Link when we want to navigate to a different page on click of a button or a link and useNavigate when we want to navigate to a different page programmatically like after a successful login or logout

import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Select, Input } from "./index.js";
import authService from "../appwrite/auth.js";
import Logo from "./Logo.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm(); // comes under curly braces because we are using multiple functions from useForm

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data.email, data.password);
      if (session) {
        const userData = await authService.getCurrentuser();
        if (userData) dispatch(authLogin(userData)); //dispatching the user data to the redux store
        navigate("/"); //navigate to home page after successful login
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={` mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border borfer-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
            label="Email: "
            type ="email"
            placeholder="Enter your email"
            {...register("email",
              {
                required: true,
                validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
              })} 
            />

            <Input
            label="Password: "
            type ="password"
            placeholder="Enter your password"
            {...register("password",
              {
                required: true,

            })}
            />

            <Button
            type="submit"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
