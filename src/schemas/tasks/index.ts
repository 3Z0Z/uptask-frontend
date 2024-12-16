import { z } from "zod";

export const TaskStatusSchema = z.enum([
  "PENDING",
  "ON_HOLD",
  "IN_PROGRESS",
  "UNDER_REVIEW",
  "COMPLETED",
]);

export const TaskSchema = z.object({
  _id: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  status: TaskStatusSchema,
  createAt: z.string(),
});
