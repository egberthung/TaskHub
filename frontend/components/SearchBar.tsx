import { SearchBarProps, Task } from "@/types";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

const SearchBar = ({
  placeholder = "Search tasks...",
  value,
  tasks,
  onChange,
}: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    if (!value) return [];
    return tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value, tasks]);

  const handleSelect = (title: string) => {
    onChange?.({
      target: { value: title },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };
  return (
    <div className="relative w-full max-w-md">
      <div
        className="
        flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-white/10
        backdrop-blur-2xl
        border border-white/15
        shadow-lg
        transition-all duration-300
        focus-within:border-white
        focus-within:bg-white/15
        "
      >
        <Icon icon="ri:search-line" className="text-white/40" />

        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange?.(e);
            setIsOpen(true);
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          placeholder={placeholder}
          className="
            bg-transparent
            outline-none
            text-white
            placeholder:text-white/40
            w-full
          "
        />
      </div>

      {isOpen && filteredTasks.length > 0 && (
        <ul className="absolute mt-2 w-full bg-black/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg max-h-60 overflow-y-auto z-50">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              onMouseDown={() => handleSelect(task.title)}
              className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
