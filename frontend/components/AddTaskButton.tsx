"use client";
import CustomButton from "./CustomButton";
import { AddTaskButtonProps } from "@/types";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddTaskButton = ({ users }: AddTaskButtonProps) => {
  const route = useRouter();
  const [activeModal, setActiveModal] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const min = new Date();
  min.setHours(min.getHours() + 1);
  const minDateTime = min
    .toLocaleString("sv-SE", { timeZone: "Asia/Jakarta" })
    .slice(0, 16);

  const handleCloseModal = () => {
    setTitle("");
    setDueDate("");
    setAssignee("");
    setActiveModal(false);
  };

  const handleCreateTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assignTo = assignee === "none" ? null : assignee;
    await fetch("http://localhost:8081/api/taskhub/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        due_date: new Date(dueDate).toISOString(),
        assignee: assignTo,
      }),
      credentials: "include",
    });
    handleCloseModal();
    route.refresh();
  };

  return (
    <div>
      <CustomButton
        title="Add Task"
        className="bg-cyan-700 rounded-md text-white py-2 px-6 font-medium hover:bg-white w-auto select-all"
        icon="ic:baseline-plus"
        onClick={() => setActiveModal(true)}
      />
      {activeModal && (
        <Modal open={activeModal} onClose={handleCloseModal}>
          <form
            onSubmit={handleCreateTask}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="fixed inset-0 bg-black/50"></div>
            <div className="relative max-w-md w-full bg-white rounded-xl p-6">
              <h2
                id="modal-modal-title"
                className="text-lg font-bold text-gray-900"
              >
                Create Task
              </h2>
              <p id="modal-modal-description" className="text-gray-600 mt-2">
                Fill in the task details below.
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {/* Task Title */}
                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                {/* Due Date */}
                <input
                  type="datetime-local"
                  required
                  min={minDateTime}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {/* Assignee */}
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="" disabled hidden>
                    Select Assignee
                  </option>
                  {/* Opsi None */}
                  <option value="none">None</option>
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
                  onClick={handleCloseModal}
                />
                <CustomButton
                  title="Create task"
                  type="submit"
                  className="px-4 py-2 mt-6 bg-cyan-700 text-white rounded-md border hover:bg-white hover:text-cyan-700 hover:border-cyan-700"
                />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddTaskButton;
