import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="w-full flex flex-row ">
      <div className="md:block hidden h-screen flex-1">
        <img
          alt="register-img"
          src="/images/registerimg.jpeg"
          className="h-full"
        />
      </div>
      <div className="flex-1">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
