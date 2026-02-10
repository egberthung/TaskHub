import { TaskStatusCardProps } from "@/types";
import React from "react";
import { Icon } from "@iconify/react";

const VARIANT_COLOR = {
  total: "bg-linear-to-br from-cyan-800/80 to-cyan-500/50",
  completed: "bg-linear-to-br from-green-600/80 to-green-500/50",
  ongoing: "bg-linear-to-br from-amber-600/80 to-amber-500/50",
  overdue: "bg-linear-to-br from-red-600/80 to-red-500/50",
};

const VARIANT_ICON = {
  total: "tdesign:task-filled",
  completed: "material-symbols:check",
  ongoing: "mdi:clock",
  overdue: "pajamas:calendar-overdue",
};

const taskStatusCard = ({
  title,
  totalTask,
  variants,
}: TaskStatusCardProps) => {
  return (
    <div
      className={`${VARIANT_COLOR[variants]} rounded-xl p-5 w-full flex flex-1 gap-4`}
    >
      <Icon
        icon={VARIANT_ICON[variants]}
        className={`${VARIANT_COLOR[variants]} font-bold text-4xl self-center rounded-xl to-90% text-white p-2`}
      />
      <div className="flex flex-col">
        <h1 className="font-medium text-lg text-white">{title}</h1>
        <p className="font-medium text-3xl text-white">{totalTask}</p>
      </div>
    </div>
  );
};

export default taskStatusCard;
