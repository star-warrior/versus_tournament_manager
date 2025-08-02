import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessIndicator({ message = "Success!" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000); // hide after 2s
    return () => clearTimeout(timer); // cleanup if unmounted early
  }, []);

  if (!visible) return null;

  return (
    <div className=" fixed top-5 right-5 z-50 flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md w-fit">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
