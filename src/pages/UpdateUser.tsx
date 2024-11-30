import { useEffect, useState } from "react";
import api from "../utils/api";
import Form from "../components/Form";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    api
      .get(`/users/${id}`)
      .then((response) => {
        console.log(response);

        const user = response.data;

        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/users");
        toast.error("Usuário não encontrado.");
      });
  }, []);

  const updateUser = () => {
    setLoading(true);
    
    api
      .put(`/users/${id}`, { name, email, role })
      .then((response) => {
        console.log(response);
        navigate("/users");
        toast.success("Usuário criado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Ocorreu um erro ao atualizar o usuário.");
      });
  };

  return (
    <Form
      title="Usuários"
      buttonText="Atualizar"
      loading={loading}
      submitFunction={updateUser}
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
