import { SearchBarProps } from "@/types";
import React from "react";
import { Icon } from "@iconify/react";

const SearchBar = ({
  placeholder = "Search tasks...",
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div
      className="
        flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-white/10
        backdrop-blur-2xl
        border border-white/15
        shadow-lg
        w-full max-w-md

        transition-all duration-350 ease-linear
      focus-within:border-white
      focus-within:bg-white/15
        "
    >
      {/* icon */}
      <Icon icon="ri:search-line" className="text-white/40" />

      {/* input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          bg-transparent
          outline-none
          text-white
          placeholder:text-white/40
          w-full"
      />
    </div>
  );
};

export default SearchBar;
