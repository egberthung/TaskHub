"use client";
import React, { useState } from "react";
import TaskTable from "./TaskTable";
import { TaskTableProps } from "@/types";
import CustomButton from "./CustomButton";

const PaginatedTaskTable = ({ tasks, userId, users }: TaskTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil((tasks?.length || 0) / pageSize);
  const paginatedTasks =
    tasks?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  return (
    <div>
      <TaskTable tasks={paginatedTasks} userId={userId} users={users} />
      <div className="flex justify-center gap-2 mt-5">
        <CustomButton
          title="Prev"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`bg-cyan-700 rounded-md text-white py-2 px-6 font-medium ${currentPage === 1 ? "" : "hover:bg-white"} w-auto select-all`}
        />
        <span className="px-3 py-1 flex items-center text-white">
          {currentPage} / {totalPages}
        </span>
        <CustomButton
          title="Next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`bg-cyan-700 rounded-md text-white py-2 px-6 font-medium ${currentPage === totalPages ? "" : "hover:bg-white"} w-auto select-all`}
        />
      </div>
    </div>
  );
};

export default PaginatedTaskTable;
