import axios from "axios";
import { LogOut } from "lucide-react";

const handleLogout = async () => {
  await axios.get("/auth/logout", { withCredentials: true });
  window.location.href = "/"; // Redirect to login or home
};

export default function Logout() {
  return (
    <button
      className="cursor-pointer flex gap-2 p-3 m-0 text-sm hover:bg-red-400 hover:text-white rounded-md w-full transition-all duration-300"
      onClick={handleLogout}
    >
      <LogOut />
      Logout
    </button>
  );
}
