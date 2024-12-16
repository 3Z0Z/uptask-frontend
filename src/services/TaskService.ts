import { AxiosResponse, isAxiosError } from "axios";

import api from "../lib/axios";
import { ProjectDTO } from "@/types/projects";
import { CreateTaskDTO, DelteTaskByIdDTO, GetTaskByIdDTO, TaskDTO, TaskFormDTO, UpdateTaskByIdDTO, UpdateTaskStatusByIdDTO } from "@/types/tasks";

export async function createTask(request: CreateTaskDTO) {
  try {
    await api.post('/task/createTask', request);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}

export async function getTasksByProjectId(projectId: ProjectDTO['_id']) {
  try {
    const { data }:AxiosResponse<TaskDTO[]> = await api(`/task/getTasksByProjectId?projectId=${projectId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}

export async function getTaskById({ projectId, _id }: GetTaskByIdDTO) {
  try {
    const { data }:AxiosResponse<TaskDTO> = await api(`/task/getTaskById?id=${_id}&projectId=${projectId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}

export async function updateTaskById(request: UpdateTaskByIdDTO) {
  try {
    const requestBody: TaskFormDTO = {
      name: request.name,
      description: request.description
    }
    await api.put(`/task/updateTaskById?projectId=${request.projectId}&id=${request._id}`, requestBody);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}

export async function updateTastStatusById(request: UpdateTaskStatusByIdDTO) {
  try {
    await api.patch(`/task/updateStateTaskById?projectId=${request.projectId}&id=${request._id}`, { state: request.status });
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}

export async function deleteTaskById(request: DelteTaskByIdDTO) {
  try {
    await api.delete(`/task/deleteTaskById?projectId=${request.projectId}&id=${request._id}`);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message 
        ? error.response.data.message 
        : 'Ocurrio un error desconocido'
      );
    }
    throw new Error("Ocurrio un error desconocido");
  }
}
