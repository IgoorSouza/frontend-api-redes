import { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import updateIcon from "../assets/update.svg";
import loadingIcon from "../assets/loading.svg";
import User from "../types/user";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro ao buscar os usuários.");
      });
  }, []);

  const deleteUser = (id: string) => {
    if (loading) return;

    setLoading(true);

    api
      .delete(`/users/${id}`)
      .then((response) => {
        console.log(response);
        setUsers((state) => state.filter((user) => user.id !== id));
        toast.success("Usuário deletado com sucesso.");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao deletar o usuário.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-[1000px]">
      <h1 className="text-center text-3xl mt-20 mb-5 font-bold">Usuários</h1>

      <Link
        to="/users/new"
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
              <th className="py-3 border-slate-300">Nome</th>
              <th className="py-3 border-slate-300">Email</th>
              <th className="py-3 border-slate-300">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr
                className="hover:bg-slate-200 transition-all duration-400"
                key={user.id}
              >
                <td className="border-t w-1/5 py-3 border-slate-300 text-center">
                  {user.name}
                </td>
                <td className="border-t w-1/5 py-3 border-slate-300 text-center">
                  {user.email}
                </td>
                <td className="border-t w-1/5 py-2 border-slate-300 text-center">
                  {user.role}
                </td>
                <td className="w-[5%] border-t border-slate-300">
                  <Link to={`/users/update/${user.id}`}>
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
                    onClick={() => deleteUser(user.id)}
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
