export type TaskStatus = "Completed" | "Ongoing" | "Overdue" | "Open";

export const STAT_CARD_CONFIG = [
  {
    key: "total_tasks",
    title: "Total Tasks",
    variant: "total",
  },
  {
    key: "completed_tasks",
    title: "Completed",
    variant: "completed",
  },
  {
    key: "ongoing_tasks",
    title: "Ongoing",
    variant: "ongoing",
  },
  {
    key: "overdue_tasks",
    title: "Overdue",
    variant: "overdue",
  },
] as const;

export interface Auth {
  isLogin?: boolean;
}

export interface CustomButtonProps {
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  icon?: string;
  disabled?: boolean;
}

export interface AuthFormProps {
  type: "Register" | "Login";
}

export interface TaskStatusCardProps {
  title: string;
  totalTask: number;
  variants: "total" | "completed" | "ongoing" | "overdue";
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  due_date: string;
  assignee: string;
  assigneeId: string;
}

export interface TaskTableProps {
  tasks: Task[] | null;
  userId: string;
  users: User[];
}

export interface User {
  id: string;
  name: string;
}

export interface AddTaskButtonProps {
  users: User[];
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface StatusBadgeProps {
  status: string;
  onChange: (value: TaskStatus) => void;
}

export interface AssigneeSelectProps {
  assignee: string;
  assigneeId: string;
  users: User[];
  onChange: (value: string) => void;
}
