import React from "react";
import googleLogo from "../../assets/pictures/google.png";

// LoginButton.jsx
const handleGoogleLogin = () => {
  window.open("http://localhost:3000/auth/google", "_self");
};

export default function LoginButton() {
  return (
    <button
      className="flex items-center justify-center gap-2 border-2 border-gray-400 rounded-md px-3 py-1.5 hover:bg-blue-700 hover:text-white transition-all duration-300"
      onClick={handleGoogleLogin}
    >
      <img src={googleLogo} className="h-5" alt="" />
      Sign in with Google
    </button>
  );
}
