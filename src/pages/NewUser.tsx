import { useState } from "react";
import api from "../utils/api";
import Form from "../components/Form";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const createUser = () => {
    setLoading(true);
    api
      .post("/users", { name, email, role })
      .then((response) => {
        console.log(response);
        navigate("/users");
        toast.success("Usuário criado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Ocorreu um erro ao criar o usuário.");
      });
  };

  return (
    <Form
      title="Usuários"
      buttonText="Criar"
      loading={loading}
      submitFunction={createUser}
    >
      <Input
        label="Nome"
        id="user-name"
        type="text"
        value={name}
        placeholder="Insira o nome do usuário..."
        maxLength={50}
        setter={setName}
      />
      <Input
        label="Email"
        id="user-email"
        type="email"
        value={email}
        placeholder="Insira o email do usuário..."
        maxLength={50}
        setter={setEmail}
      />
      <Input
        label="Cargo"
        id="user-role"
        type="text"
        value={role}
        placeholder="Insira o cargo do usuário..."
        maxLength={50}
        setter={setRole}
      />
    </Form>
  );
}
