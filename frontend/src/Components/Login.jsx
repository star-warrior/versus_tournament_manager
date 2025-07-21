import React from "react";
import googleLogo from "../../assets/pictures/google.png";

// LoginButton.jsx
const handleGoogleLogin = () => {
  window.open("http://localhost:3000/auth/google", "_self");
};

export default function Login({ text }) {
  // return (

  //     {text ? (
  //
  //     ) : (

  //     )}
  //   </button>
  // );

  return text ? (
    <button
      className="
    flex items-center justify-center gap-2 
     rounded-md 
    px-4 py-2 
    bg-[var(--primary)] text-white 
    transition-all duration-300
    hover:shadow-lg hover:shadow-gray-500
  "
      onClick={handleGoogleLogin}
    >
      <span className="text-lg">{text}</span>
    </button>
  ) : (
    <button
      className="flex items-center justify-center gap-2 border-2 border-gray-400 rounded-md px-3 py-1.5 hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
      onClick={handleGoogleLogin}
    >
      <img src={googleLogo} className="h-5" alt="Google Logo" />
      Login
    </button>
  );
}
