import { TaskDTO } from "@/types/tasks";

export type GroupedTask = {
  [key: string]: TaskDTO[];
};

export const initialStatusGroups: GroupedTask = {
  PENDING: [],
  ON_HOLD: [],
  IN_PROGRESS: [],
  UNDER_REVIEW: [],
  COMPLETED: [],
};

export const statusTranslations: { [key: string]: string } = {
  PENDING: "Pendiente",
  ON_HOLD: "En espera",
  IN_PROGRESS: "En progreso",
  UNDER_REVIEW: "En revisión",
  COMPLETED: "Completado",
};

export const statusStyles: { [key: string]: string } = {
  PENDING: "border-t-slate-500",
  ON_HOLD: "border-t-red-500",
  IN_PROGRESS: "border-t-blue-500",
  UNDER_REVIEW: "border-t-amber-500",
  COMPLETED: "border-t-emerald-500",
};

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return formatter.format(date);
}