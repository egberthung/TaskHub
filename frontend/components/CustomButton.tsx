import React from "react";
import { CustomButtonProps } from "../types/index";
import { Icon } from "@iconify/react";

const CustomButton = ({
  title,
  className = "",
  onClick,
  type = "button",
  icon,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`font-bold hover:text-cyan-500 flex items-center cursor-pointer px-4 gap-1 justify-center ${className}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} className="text-lg" />}
      {title}
    </button>
  );
};

export default CustomButton;
