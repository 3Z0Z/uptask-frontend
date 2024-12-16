import { AxiosResponse, isAxiosError } from "axios";

import api from "../lib/axios";
import { ProjectDTO, ProjectFormDTO } from "@/types/projects";

export async function createProject(request: ProjectFormDTO) {
  try {
    await api.post("/project/createProject", request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getProjects(): Promise<ProjectDTO[]> {
  try {
    const { data }: AxiosResponse<ProjectDTO[]> = await api('/project/getProjects');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Ocurrió un error desconocido');
  }
}

export async function getProjectById(id: ProjectDTO['_id']): Promise<ProjectDTO> {
  try {
    const { data }: AxiosResponse<ProjectDTO> = await api(`/project/getProjectById?id=${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Ocurrió un error desconocido');
  }
}

type UpdateProyectById = {
  projectId: ProjectDTO['_id'];
  request: ProjectFormDTO;
}

export async function updateProyectById({projectId, request} : UpdateProyectById) {
  try {
    await api.put(`/project/updateProjectById?id=${projectId}`, request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Ocurrió un error desconocido');
  }
}

export async function deleteProjectById(id: ProjectDTO['_id']) {
  try {
    await api.delete(`/project/deleteProjectById?id=${id}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Ocurrió un error desconocido');
  }
}