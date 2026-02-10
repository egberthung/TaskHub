import React from "react";
import { TaskTableProps } from "../types/index";
import { formatDateID } from "../composables/utility";

const TaskTable = ({ tasks }: TaskTableProps) => {
  return (
    <div
      className="
        overflow-hidden rounded-2xl
        backdrop-blur-2x
        border border-white/15 shadow-xl
      "
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-white/60 border-b border-white/10">
            <th className="px-6 py-4 font-medium">Task</th>
            <th className="px-3 py-4 font-medium">Due Date</th>
            <th className="px-2 py-4 font-medium">Status</th>
            <th className="px-4 py-4 font-medium">Assign To</th>
            <th className="px-6 py-4 font-medium">Action</th>
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
                <td className="px-6 py-4 text-white">{task.title}</td>
                <td className="px-3 py-4 text-white/80">
                  {formatDateID(task.due_date)}
                </td>
                <td className="px-2 py-4 text-white/80">{task.status}</td>
                <td className="px-4 py-4 text-white/80">
                  {task.assignee ?? "-"}
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
