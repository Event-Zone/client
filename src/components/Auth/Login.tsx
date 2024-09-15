import React, { useEffect } from "react";
import LoginForm from "./LoginForm";

function Login() {
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
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
