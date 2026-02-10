"use client";
import { StatusBadgeProps } from "@/types";
import CustomButton from "./CustomButton";
import { useEffect, useRef, useState } from "react";
import { TaskStatus } from "../types/index";

const statusStyleMap: Record<string, string> = {
  Ongoing: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
  Overdue: "bg-red-500/20 text-red-400 hover:bg-white-500/30",
  Completed: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
};

const STATUSES: TaskStatus[] = ["Ongoing", "Completed", "Open"];

const StatusBadge = ({ status, onChange }: StatusBadgeProps) => {
  const [openSelector, setOpenSelector] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChooseSelector = (value: TaskStatus) => {
    onChange(value);
    setOpenSelector(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpenSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <CustomButton
        title={status}
        type="button"
        icon="material-symbols:circle"
        onClick={(e) => {
          e.stopPropagation();
          setOpenSelector((v) => !v);
        }}
        className={`
        px-3 py-1 rounded-full text-xs font-medium
        transition
        flex gap-1 items-center
        capitalize  
        hover:text-gray-500
        ${statusStyleMap[status] ?? "bg-gray-500/20 text-gray-400"}
      `}
      />
      {(openSelector && status !== "Completed") && (
        <div className="absolute z-3 mt-2 w-32 bg-gray-900 border border-white/10 shadow-xl">
          {STATUSES.filter((s) => {
            if (status === "Overdue") return s === "Completed";
            else return s !== status;
          }).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleChooseSelector(s)}
              className="
                block w-full px-3 py-2 text-left
                text-white hover:bg-white/10
              "
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
