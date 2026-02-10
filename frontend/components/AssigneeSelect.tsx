import { AssigneeSelectProps } from "@/types";
import React, { useState } from "react";

const AssigneeSelect = ({
  assignee,
  onChange,
  users,
  assigneeId,
}: AssigneeSelectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(assignee ?? "-");
  const handleSelectChange = (value: string) => {
    const assigneeName = users.find((user) => user.id === value)?.name ?? "-";
    setSelectedUser(assigneeName);
    onChange(value);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <select
          value={selectedUser}
          onChange={(e) => handleSelectChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="bg-gray-800 text-white p-1 rounded"
        >
          <option value="">{selectedUser}</option>
          {users
            .filter((user) => user.id !== assigneeId)
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      ) : (
        <span onClick={() => setIsEditing(true)}>{selectedUser || "-"}</span>
      )}
    </div>
  );
};

export default AssigneeSelect;
