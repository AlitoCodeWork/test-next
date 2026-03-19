import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    id: "p-101",
    title: "Migracion de plataforma e-commerce",
    status: "Activo",
    date: "2026-03-15",
    owner: "Ana Suarez",
    budget: 42000,
    description:
      "Refactor del checkout y pasarela de pagos para mejorar conversion y trazabilidad de eventos.",
  },
  {
    id: "p-102",
    title: "Rediseno de onboarding B2B",
    status: "En pausa",
    date: "2026-03-08",
    owner: "Martin Ponce",
    budget: 18000,
    description:
      "Nuevo flujo de alta para cuentas corporativas con validaciones de dominio y aprobacion interna.",
  },
  {
    id: "p-103",
    title: "Panel de analitica comercial",
    status: "Completado",
    date: "2026-02-26",
    owner: "Laura Mendez",
    budget: 25000,
    description:
      "Dashboard con KPI de ventas, cohortes y exportacion de reportes para liderazgo regional.",
  },
];