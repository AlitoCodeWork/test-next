"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useProjects } from "../projects-context";
import { Search, Plus } from "lucide-react";
import { StatusBadge } from "../components/status-badge";
import { ProjectStatus } from "@/types/project";

const filterOptions = ["Todos", "Activo", "Completado", "En pausa"];

export default function ProjectsPage() {
  const { projects, isHydrated } = useProjects();
  const [status, setStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const statusMatches = status === "Todos" || project.status === status;
      const queryMatches =
        project.title.toLowerCase().includes(query) ||
        project.owner.toLowerCase().includes(query);
      return statusMatches && queryMatches;
    });
  }, [projects, search, status]);

  return (
    <div className="space-y-7">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Proyectos</h1>
          <p className="mt-0.5 text-sm text-gray-500">Gestiona y filtra tus proyectos activos.</p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 active:bg-gray-800"
        >
          <Plus className="h-3.5 w-3.5" />
          Nuevo proyecto
        </Link>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por titulo o responsable..."
            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer sm:w-44"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {!isHydrated ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-gray-700">Sin resultados</p>
          <p className="mt-1 text-sm text-gray-400">Intenta con otros terminos o cambia el filtro.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-400"
            >
              <div className="space-y-3">
                <StatusBadge status={project.status as ProjectStatus} />
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                  {project.title}
                </h3>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="truncate text-xs text-gray-500 max-w-[60%]">{project.owner}</span>
                <span className="text-xs text-gray-400">{project.date}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}