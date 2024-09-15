"use client";
import {
  useRegisterUserMutation,
  useSendA2FMutation,
} from "@/store/features/api/apiSlice";
import { resetUserData, setUserData } from "@/store/features/userSlice";
import { useRouter } from "@/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "../shared/GoogleLoginButton";
import Spinner from "@/components/shared/Progress";
import MessageDialog from "@/components/shared/Message";
import { useTranslations } from "next-intl";

function RegisterForm() {
  const [showFormCode, setShowFormCode] = useState(false);
  const [sendA2F, sendA2FResult] = useSendA2FMutation();
  const [a2fCode, setA2fCode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUserData());
  }, []);

  const handleA2fSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Process the A2F code here
    await sendA2F({ email: formData.email, code: a2fCode }).unwrap();
    console.log("A2F Code submitted:");
    // You can add further logic to handle the A2F code submission
  };

  const router = useRouter();
  const [registerUser, registerUserResult] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await registerUser({
        email: formData.email,
        fullname: formData.fullname,
        username: formData.username,
        password: formData.password,
      }).unwrap();
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    if (registerUserResult.isSuccess) {
      console.log("User registered successfully");
      setShowFormCode(true);
      // dispatch(setUserData(registerUserResult.data));
      // router.push("/welcome");
    } else if (registerUserResult.isError) {
      console.error("Error registering user:", registerUserResult.error);
    } else if (registerUserResult.isLoading) {
      console.log("Loading...");
    }
  }, [registerUserResult]);

  useEffect(() => {
    if (sendA2FResult.isSuccess) {
      console.log("User registered successfully");
      dispatch(setUserData(sendA2FResult.data));
      router.push("/welcome");
    } else if (sendA2FResult.isError) {
      console.error("Error registering user:", sendA2FResult.error);
    } else if (sendA2FResult.isLoading) {
      console.log("Loading...");
    }
  }, [sendA2FResult]);
  const t = useTranslations("Register");
  return (
    <>
      {showFormCode ? (
        <form
          className="flex flex-col items-center md:p-6 md:mx-24"
          onSubmit={handleA2fSubmit}
        >
          <label htmlFor="a2fCode">{t("a2fCode")}</label>
          <input
            type="text"
            id="a2fCode"
            value={a2fCode}
            onChange={(e) => setA2fCode(e.target.value)}
            required
            placeholder="xxxxxx"
            className="border border-gray-300 rounded p-4"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-xl mt-3 ${
              a2fCode.length === 6 && "bg-mainBlue"
            }`}
          >
            {t("a2fsubmit")}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-6 md:mx-24"
        >
          <div className="flex flex-col justify-center items-center ">
            <img src="/icons/Union.png" alt="Logo" className="mb-1" />
            <img src="/images/Logo.png" alt="Logo" className="mb-6" />
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
          <div className="w-full flex mb-4">
            <div className="w-1/2 pr-2">
              <input
                type="text"
                name={"fullname"}
                placeholder="Nom"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {/* <input
                type="text"
                name="username"
                placeholder="nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              /> */}
            </div>
          </div>
          <div className="w-full mb-4">
            <input
              type="password"
              name="password"
              placeholder={t("password")}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder={t("confirmPassword")}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mb-4 bg-mainBlue text-white rounded"
          >
            {t("submit")}
          </button>
          <div className="flex flex-row w-full">
            <button className="flex items-center justify-center w-full p-2 text-titles rounded ">
              <GoogleLoginButton />
            </button>
          </div>
        </form>
      )}
      {registerUserResult.isLoading || sendA2FResult.isLoading ? (
        <Spinner />
      ) : null}
      {registerUserResult.isError || sendA2FResult.isError ? (
        <MessageDialog message={{ type: 0, content: "Error occurred" }} />
      ) : null}
    </>
  );
}

export default RegisterForm;
