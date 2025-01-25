import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import CreateProjectPage from "@/pages/projects/CreateProjectPage";
import EditProjectPage from "@/pages/projects/EditProjectPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ConfirmAccountPage from "@/pages/Auth/ConfirmAccountPage";
import RequestNewCodePage from "@/pages/Auth/RequestNewCodePage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import NewPasswordPage from "@/pages/Auth/NewPasswordPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<DashboardPage/>} index />
          <Route path="/projects/create" element={<CreateProjectPage/>} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/projects/:projectId/edit" element={<EditProjectPage/>} />
        </Route>
        <Route element={<AuthLayout/>}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountPage />} />
          <Route path="/auth/request-code" element={<RequestNewCodePage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
