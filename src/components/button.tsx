import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-700 transition"
    >
      {title}
    </button>
  );
};

export default Button;
