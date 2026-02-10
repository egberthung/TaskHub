import { redirectIfNotLoggedIn } from "@/composables/utility";
import TaskStatusCard from "../../components/TaskStatusCard";
import { headers } from "next/headers";
import { STAT_CARD_CONFIG } from "@/types";
import SearchBar from "../../components/SearchBar";
import AddTaskButton from "../../components/AddTaskButton";
import PaginatedTaskTable from "../../components/PaginatedTaskTable";

const page = async () => {
  await redirectIfNotLoggedIn();
  const cookie = (await headers()).get("cookie");
  const userRes = await fetch(`http://localhost:8081/api/taskhub/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || "",
    },
  });
  const usersRes = await fetch(`http://localhost:8081/api/taskhub/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || "",
    },
  });
  const tasksRes = await fetch("http://localhost:8081/api/taskhub/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || "",
    },
  });
  const userData = await userRes.json();
  const usersData = await usersRes.json();
  const tasksData = await tasksRes.json();

  return (
    <div className="px-22 py-7">
      <div className="flex flex-col gap-6 mb-4">
        <h1 className="text-5xl text-white font-medium">Dashboard</h1>
        <p className="text-lg text-gray-200/60 ml-1 font-medium">
          Welcome back, {userData.name}!
        </p>
      </div>
      <div className="flex w-full ml-1 flex-col gap-7">
        <div className="flex gap-4">
          {STAT_CARD_CONFIG.map((item) => (
            <TaskStatusCard
              key={item.key}
              title={item.title}
              totalTask={tasksData.stats[item.key]}
              variants={item.variant}
            />
          ))}
        </div>
        <div className="flex flex-col gap-5 bg-linear-to-br from-blue-950/40 to-purple-950/40 rounded-lg border-white/10 border w-250 h-130">
          <div className="flex px-6 pt-6 w-full justify-between">
            <AddTaskButton users={usersData.users} />
            <SearchBar />
          </div>
          <div className="w-full">
            <PaginatedTaskTable
              tasks={tasksData.tasks}
              userId={userData.id}
              users={usersData.users}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
