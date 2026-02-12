import { EditTaskModalProps } from "@/types";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { TaskStatus } from "../types/index";

const STATUSES: TaskStatus[] = ["Ongoing", "Completed", "Open"];

const EditTaskModal = ({
  open,
  task,
  onClose,
  onConfirm,
  users,
  userId,
}: EditTaskModalProps) => {
  const formatForInput = (isoString: string) => {
    const date = new Date(isoString);
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };
  const [form, setForm] = useState(() => ({
    title: task?.title ?? "",
    due_date: formatForInput(task?.due_date as string) ?? "",
    assignee: userId ?? "",
    status: task?.status ?? "Open",
  }));

  const min = new Date();
  min.setHours(min.getHours() + 1);
  min.setMinutes(min.getMinutes() + 2);
  const minDateTime = min
    .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
    .slice(0, 16);
  const handleCancelEdit = () => {
    setForm({
      title: "",
      due_date: "",
      assignee: "",
      status: "Open",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const payload = {
            ...form,
            due_date: new Date(form.due_date).toISOString(),
          };

          onConfirm(task?.id ?? "", payload);
        }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/50"></div>
        <div className="relative max-w-md w-full bg-white rounded-xl p-6">
          <h2
            id="modal-modal-title"
            className="text-lg font-bold text-gray-900"
          >
            Edit &quot;
            {task?.title ?? ""}
            &quot;?
          </h2>
          <p id="modal-modal-description" className="text-gray-600 mt-2">
            Fill in the task details below.
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {/* Task Title */}
            <input
              type="text"
              placeholder={task?.title}
              value={form.title}
              required
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Due Date */}
            <input
              type="datetime-local"
              required
              min={minDateTime}
              value={form.due_date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, due_date: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {/* status */}
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as TaskStatus,
                }))
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled hidden></option>
              {STATUSES.filter((s) => {
                if (form.status === "Overdue") {
                  return s === "Completed" || s === "Overdue";
                }
                return true; // semua boleh jika bukan overdue
              }).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {/* Assignee */}
            <select
              value={form.assignee}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, assignee: e.target.value }))
              }
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled hidden>
                {task?.assignee}
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-5">
            <CustomButton
              title="Cancel"
              className="px-4 py-2 mt-6 bg-red-700 text-white rounded-md border hover:bg-white hover:text-red-700 hover:border-red-700"
              onClick={handleCancelEdit}
            />
            <CustomButton
              title="Edit task"
              type="submit"
              className="px-4 py-2 mt-6 bg-cyan-700 text-white rounded-md border hover:bg-white hover:text-cyan-700 hover:border-cyan-700"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
