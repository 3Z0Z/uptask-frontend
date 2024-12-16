import { TaskSchema, TaskStatusSchema } from "schemas/tasks";
import { z } from "zod";

export type TaskStatusEnum = z.infer<typeof TaskStatusSchema>;

export type TaskDTO = z.infer<typeof TaskSchema>;

export type TaskFormDTO = Pick<TaskDTO, 'name'|'description'>;

export type CreateTaskDTO = Pick<TaskDTO, 'projectId'|'name'|'description'>;

export type GetTaskByIdDTO = Pick<TaskDTO, 'projectId'|'_id'>;

export type UpdateTaskByIdDTO = Pick<TaskDTO, '_id'|'projectId'|'name'|'description'>;

export type UpdateTaskStatusByIdDTO = Pick<TaskDTO, '_id'|'projectId'|'status'>;

export type DelteTaskByIdDTO = Pick<TaskDTO, '_id'|'projectId'>;