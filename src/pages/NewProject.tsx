import { useEffect, useState } from "react";
import api from "../utils/api";
import Form from "../components/Form";
import Input from "../components/Input";
import Select from "../components/Select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import User from "../types/user";

export default function NewProject() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [managerId, setManagerId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
        setManagerId(data[0]?.id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao buscar os usuários.");
      });
  }, []);

  const createProject = () => {
    setLoading(true);
    api
      .post("/projects", { name, description, managerId })
      .then((response) => {
        console.log(response);
        navigate("/projects");
        toast.success("Projeto criado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao criar o projeto.");
      });
  };

  return (
    <Form
      title="Projetos"
      buttonText="Criar"
      loading={loading}
      submitFunction={createProject}
    >
      <Input
        label="Nome"
        id="project-name"
        type="text"
        placeholder="Insira o nome do projeto..."
        maxLength={50}
        value={name}
        setter={setName}
      />
      <Input
        label="Descrição"
        id="project-description"
        type="text"
        placeholder="Insira a descrição do projeto..."
        maxLength={50}
        value={description}
        setter={setDescription}
      />
      <Select
        label="Gerente"
        id="project-manager"
        options={users}
        value={managerId}
        setter={setManagerId}
      />
    </Form>
  );
}
