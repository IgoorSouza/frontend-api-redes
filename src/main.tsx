import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Users from "./pages/Users";
import NewUser from "./pages/NewUser";
import Redirect from "./components/Redirect";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Tasks from "./pages/Tasks";
import NewTask from "./pages/NewTask";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import UpdateUser from "./pages/UpdateUser";
import UpdateProject from "./pages/UpdateProject";
import UpdateTask from "./pages/UpdateTask";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster toastOptions={{ position: "bottom-right", duration: 3000 }} />

    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<Redirect />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/update/:id" element={<UpdateUser />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects/update/:id" element={<UpdateProject />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<NewTask />} />
        <Route path="/tasks/update/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  </StrictMode>
);
