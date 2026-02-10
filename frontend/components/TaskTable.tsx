"use client";
import { Task, TaskStatus, TaskTableProps } from "../types/index";
import { formatDateID } from "../composables/clientUtility";
import StatusBadge from "./StatusBadge";
import { capitalize } from "@mui/material";
import { useRouter } from "next/navigation";
const TaskTable = ({ tasks, userId, users }: TaskTableProps) => {
  const route = useRouter();

  const handleUpdateTask = async (id: string, updatedFields: Partial<Task>) => {
    const statusOnly = Object.keys(updatedFields)[0] === "status";
    const task = tasks?.find((t) => t.id === id);
    if (statusOnly && !task?.assignee) {
      updatedFields.assignee = userId;
    }
    await fetch(`http://localhost:8081/api/taskhub/update-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...updatedFields,
      }),
      credentials: "include",
    });
    route.refresh();
  };

  return (
    <div
      className="
        max-h-125 backdrop-blur-2x shadow-xl
      "
    >
      <table className="w-full border-t border-white/10">
        <thead>
          <tr className="text-left text-sm text-white/60 border-b border-white/10">
            <th className="w-80 pl-8 py-4 font-medium">Task</th>
            <th className="w-50 py-4 font-medium">Due Date</th>
            <th className="w-40 py-4 font-medium">Status</th>
            <th className="w-60 py-4 font-medium">Assign To</th>
            <th className="w-40 pr-8 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {!tasks || tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-white/50">
                -- No data yet --
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-white/5 transition border-b border-white/5 last:border-none"
              >
                <td className="pl-8 py-4 text-white">{task.title}</td>
                <td className="py-4 text-white/80">
                  {formatDateID(task.due_date)}
                </td>
                <td className="text-white/80">
                  <StatusBadge
                    status={capitalize(task.status)}
                    onChange={(value) =>
                      handleUpdateTask(task.id, {
                        status: value.toLowerCase() as TaskStatus,
                      })
                    }
                    key={`status-${task.id}`}
                  />
                </td>
                <td className="py-4 text-white/80">{task.assignee ?? "-"}</td>
                <td className="pr-8 py-4"></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
