import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import updateIcon from "../assets/update.svg";
import loadingIcon from "../assets/loading.svg";
import Task from "../types/task";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get("/tasks");
        console.log(response);

        const tasks = response.data;

        const tasksWithAssigneeAndProjectNames = await Promise.all(
          tasks.map(async (task: Task) => {
            const projectResponse = await api.get(
              `/projects/${task.projectId}`
            );
            const userResponse = await api.get(`/users/${task.assigneeId}`);
            console.log(projectResponse);
            task.projectName = projectResponse.data.name;
            task.assigneeName = userResponse.data.name;
            return task;
          })
        );

        setTasks(tasksWithAssigneeAndProjectNames);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro ao buscar as tarefas.");
      }
    };

    getTasks();
  }, []);

  const deleteTask = (id: string) => {
    if (loading) return;

    setLoading(true);

    api
      .delete(`/tasks/${id}`)
      .then((response) => {
        console.log(response);
        setTasks((state) => state.filter((task) => task.id !== id));
        toast.success("Tarefa deletada com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao deletar a tarefa.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-[1000px]">
      <h1 className="text-center text-3xl mt-20 mb-5 font-bold">Tarefas</h1>

      <Link
        to="/tasks/new"
        className="self-end bg-black text-white px-4 py-1 text-lg rounded-lg cursor-pointer hover:opacity-80 mb-2"
      >
        Nova
      </Link>

      {loading ? (
        <img src={loadingIcon} className="size-20 mt-5 animate-spin" />
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 border-slate-300">Nome</th>
              <th className="px-4 py-3 border-slate-300">Descrição</th>
              <th className="px-4 py-2 border-slate-300">Prioridade</th>
              <th className="px-4 py-2 border-slate-300">Responsável</th>
              <th className="px-4 py-2 border-slate-300">Projeto</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: Task) => (
              <tr
                className="hover:cursor-pointer hover:bg-slate-200 transition-all duration-400"
                key={task.id}
              >
                <td className="border-t px-4 py-3 border-slate-300 text-center">
                  {task.name}
                </td>
                <td className="border-t px-4 py-3 border-slate-300 text-center">
                  {task.description}
                </td>
                <td className="border-t px-4 py-2 border-slate-300 text-center">
                  {task.priority}
                </td>
                <td className="border-t px-4 py-2 border-slate-300 text-center">
                  {task.assigneeName}
                </td>
                <td className="border-t px-4 py-2 border-slate-300 text-center">
                  {task.projectName}
                </td>
                <td className="w-[5%] border-t border-slate-300">
                  <Link to={`/tasks/update/${task.id}`}>
                    <img
                      src={updateIcon}
                      className="size-8 mx-auto cursor-pointer"
                    />
                  </Link>
                </td>
                <td className="w-[5%] border-t border-slate-300">
                  <img
                    src={deleteIcon}
                    className="size-8 mx-auto cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
