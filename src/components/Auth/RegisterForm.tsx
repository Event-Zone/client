import React from "react";

function RegisterForm() {
  return (
    <div className="flex flex-col items-center p-6 mx-24">
      <div className="flex flex-col justify-center items-center ">
        <img src="/Union.png" alt="Logo" className="mb-1" />
        <img src="/Logo.png" alt="Logo" className="mb-6" />
      </div>
      <div className="w-full mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full flex mb-4">
        <div className="w-1/2 pr-2">
          <input
            type="text"
            placeholder="Nom"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 pl-2">
          <input
            type="text"
            placeholder="Prénom"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="w-full mb-4">
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full mb-4">
        <input
          type="password"
          placeholder="Confirmer votre mot de passe"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button className="w-full p-2 mb-4 bg-mainBlue text-white rounded">
        Créer un compte
      </button>
      <div className="flex flex-row w-full">
        <button className="flex items-center justify-between  w-full px-3 bg-blue-700 text-white rounded mr-2 text-[14px]">
          <img src="/path14.png" alt="Facebook" className=" " />
          Continuer avec Facebook
        </button>
        <button className="flex items-center justify-center w-full p-2 text-titles rounded ">
          <img src="/GoogleLogo.png" alt="Google" className="w-4 h-4 mr-2 " />
          Continuer avec Google
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
