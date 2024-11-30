import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import updateIcon from "../assets/update.svg";
import loadingIcon from "../assets/loading.svg";
import Project from "../types/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await api.get("/projects");
        console.log(response);

        const projects = response.data;

        const projectsWithManagerName = await Promise.all(
          projects.map(async (project: Project) => {
            const userResponse = await api.get(`/users/${project.managerId}`);
            console.log(userResponse);
            project.managerName = userResponse.data.name;
            return project;
          })
        );

        setProjects(projectsWithManagerName);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Ocorreu um erro ao buscar as tarefas.");
      }
    };

    getProjects();
  }, []);

  const deleteProject = (id: string) => {
    if (loading) return;

    setLoading(true);

    api
      .delete(`/projects/${id}`)
      .then((response) => {
        console.log(response);
        setProjects((state) => state.filter((project) => project.id !== id));
        toast.success("Projeto deletado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao deletar o projeto.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-[1000px]">
      <h1 className="text-center text-3xl mt-20 mb-5 font-bold">Projetos</h1>

      <Link
        to="/projects/new"
        className="self-end bg-black text-white px-4 py-1 text-lg rounded-lg cursor-pointer hover:opacity-80 mb-2"
      >
        Novo
      </Link>

      {loading ? (
        <img src={loadingIcon} className="size-20 mt-5 animate-spin" />
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 border-slate-300">Nome</th>
              <th className="px-4 py-3 border-slate-300">Descrição</th>
              <th className="px-4 py-2 border-slate-300">Gerente</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => (
              <tr
                className="hover:cursor-pointer hover:bg-slate-200 transition-all duration-400"
                key={project.id}
              >
                <td className="border-t px-4 py-3 border-slate-300 text-center">
                  {project.name}
                </td>
                <td className="border-t px-4 py-3 border-slate-300 text-center">
                  {project.description}
                </td>
                <td className="border-t px-4 py-2 border-slate-300 text-center">
                  {project.managerName}
                </td>
                <td className="w-[5%] border-t border-slate-300">
                  <Link to={`/projects/update/${project.id}`}>
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
                    onClick={() => deleteProject(project.id)}
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
