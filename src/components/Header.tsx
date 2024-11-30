import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black w-full text-white flex justify-between px-8 py-4">
      <h1 className="text-2xl">API Redes de Computadores</h1>
      <div className="flex items-center gap-x-8 text-xl">
        <Link to="/users" className="hover:opacity-80">
          Usuários
        </Link>
        <Link to="/projects" className="hover:opacity-80">
          Projetos
        </Link>
        <Link to="/tasks" className="hover:opacity-80">
          Tarefas
        </Link>
      </div>
    </header>
  );
}
