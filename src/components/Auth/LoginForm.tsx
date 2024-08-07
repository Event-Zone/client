"use client";
import { useLoginUserMutation } from "@/store/features/api/apiSlice";
import { resetUserData, setUserData } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUserData());
  }, []);

  const router = useRouter();
  const [loginUser, loginUserResult] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      console.log("User logged in successfully");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  useEffect(() => {
    if (loginUserResult.isSuccess) {
      console.log("User logged in successfully");
      dispatch(setUserData(loginUserResult.data));

      router.push("/welcome");
    } else if (loginUserResult.isError) {
      console.error("Error logging in user:", loginUserResult.error);
    } else if (loginUserResult.isLoading) {
      console.log("Loading...");
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center p-6 mx-24"
    >
      <div className="flex flex-col justify-center items-center ">
        <img src="/Union.png" alt="Logo" className="mb-1" />
        <img src="/Logo.png" alt="Logo" className="mb-6" />
      </div>
      <div className="w-full mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full mb-4">
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 mb-4 bg-mainBlue text-white rounded"
      >
        Se connecter
      </button>
      <div className="flex flex-row w-full">
        <button className="flex items-center justify-between w-full px-3 bg-blue-700 text-white rounded mr-2 text-[14px]">
          <img src="/path14.png" alt="Facebook" className=" " />
          Continuer avec Facebook
        </button>
        <button className="flex items-center justify-center w-full p-2 text-titles rounded ">
          <img src="/GoogleLogo.png" alt="Google" className="w-4 h-4 mr-2 " />
          Continuer avec Google
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
