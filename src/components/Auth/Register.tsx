import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="w-full flex flex-row ">
      <div className=" h-screen flex-1">
        <img alt="register-img" src="/registerimg.jpeg" className="h-full" />
      </div>
      <div className="flex-1">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
