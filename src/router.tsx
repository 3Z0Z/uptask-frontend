import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import CreateProjectPage from "@/pages/projects/CreateProjectPage";
import EditProjectPage from "@/pages/projects/EditProjectPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<DashboardPage/>} index />
          <Route path="/projects/create" element={<CreateProjectPage/>} index />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} index />
          <Route path="/projects/:projectId/edit" element={<EditProjectPage/>} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
