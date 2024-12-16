import { ProjectSchema } from "schemas/projects";
import { z } from "zod";

export type ProjectDTO = z.infer<typeof ProjectSchema>

export type ProjectFormDTO = Pick<ProjectDTO, 'clientName' | 'projectName' | 'description'>;