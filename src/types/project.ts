export type ProjectStatus = "Activo" | "Completado" | "En pausa";

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  date: string;
  owner: string;
  budget: number;
  description: string;
}

export interface CreateProjectInput {
  title: string;
  status: ProjectStatus;
  owner: string;
  budget: number;
  description: string;
}