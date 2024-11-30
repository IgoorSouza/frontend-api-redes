import { useEffect, useState } from "react";
import api from "../utils/api";
import Form from "../components/Form";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import User from "../types/user";
import Project from "../types/project";

export default function NewTask() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectsAndUsers = async () => {
      api
        .get("/projects")
        .then(({ data }) => {
          setProjects(data);
          setProjectId(data[0]?.id);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocorreu um erro ao buscar os projetos.");
        });

      api
        .get("/users")
        .then(({ data }) => {
          setUsers(data);
          setAssigneeId(data[0]?.id);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ocorreu um erro ao buscar os usuários.");
        });
    };

    getProjectsAndUsers().then(() => setLoading(false));
  }, []);

  const createTask = () => {
    setLoading(true);
    api
      .post("/tasks", { name, description, priority, projectId, assigneeId })
      .then((response) => {
        console.log(response);
        navigate("/tasks");
        toast.success("Tarefa criada com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao criar a tarefa.");
      });
  };

  return (
    <Form
      title="Tarefas"
      buttonText="Criar"
      loading={loading}
      submitFunction={createTask}
    >
      <Input
        label="Nome"
        id="task-name"
        type="text"
        placeholder="Insira o nome da task..."
        maxLength={50}
        value={name}
        setter={setName}
      />
      <Input
        label="Descrição"
        id="task-description"
        type="text"
        placeholder="Insira a descrição da task..."
        maxLength={50}
        value={description}
        setter={setDescription}
      />
      <Input
        label="Prioridade"
        id="task-priority"
        type="text"
        placeholder="Insira a prioridade da task..."
        maxLength={50}
        value={priority}
        setter={setPriority}
      />
      <Select
        label="Projeto"
        id="task-project"
        options={projects}
        value={projectId}
        setter={setProjectId}
      />
      <Select
        label="Responsável"
        id="task-assignee"
        options={users}
        value={assigneeId}
        setter={setAssigneeId}
      />
    </Form>
  );
}
