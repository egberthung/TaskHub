"use client";

import { useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import PaginatedTaskTable from "./PaginatedTaskTable";
import AddTaskButton from "./AddTaskButton";
import { ClientDashboardProps } from "@/types";

const ClientDashboard = ({ tasks, userId, users }: ClientDashboardProps) => {
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, tasks]);
  return (
    <>
      <div className="flex px-6 pt-6 w-full justify-between mb-3">
        <AddTaskButton users={users} />
        <SearchBar
          tasks={tasks}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full">
        <PaginatedTaskTable
          tasks={filteredTasks}
          userId={userId}
          users={users}
        />
      </div>
    </>
  );
};

export default ClientDashboard;
