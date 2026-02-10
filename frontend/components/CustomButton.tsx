import React from "react";
import { CustomButtonProps } from "../types/index";
import { Icon } from "@iconify/react";

const CustomButton = ({
  title,
  className = "",
  onClick,
  type = "button",
  icon,
  disabled,
}: CustomButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`font-bold  flex items-center px-4 gap-1 justify-center ${className} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-cyan-500"}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}
      {title}
    </button>
  );
};

export default CustomButton;
