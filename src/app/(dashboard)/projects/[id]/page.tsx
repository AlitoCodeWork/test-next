"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useProjects } from "../../projects-context";
import { StatusBadge } from "../../components/status-badge";
import { ArrowLeft, Calendar, FileText, Hash, User, DollarSign } from "lucide-react";
import { ProjectStatus } from "@/types/project";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const { getProjectById, isHydrated } = useProjects();

  const project = getProjectById(params.id);

  if (!isHydrated) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 border-dashed bg-slate-50/50">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          <p className="text-sm font-medium">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 border-dashed bg-slate-50/50 p-12 text-center">
        <FileText className="h-10 w-10 text-slate-300" />
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Proyecto no encontrado</h2>
          <p className="mt-1 text-sm text-slate-500">
            El proyecto que buscas no existe o fue eliminado del sistema.
          </p>
        </div>
        <Link
          href="/projects"
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-7">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Proyectos
      </Link>

      <header className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-gray-900 leading-snug max-w-lg">
            {project.title}
          </h1>
          <StatusBadge status={project.status as ProjectStatus} />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Hash className="h-3.5 w-3.5" />
            {project.id}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {project.date}
          </span>
        </div>
      </header>

      <div className="border-t border-gray-200" />

      <dl className="grid gap-px bg-gray-200 rounded-lg overflow-hidden sm:grid-cols-2">
        <div className="bg-white px-5 py-4">
          <dt className="flex items-center gap-1.5 text-xs text-gray-400">
            <User className="h-3.5 w-3.5" />
            Responsable
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-gray-900">{project.owner}</dd>
        </div>
        <div className="bg-white px-5 py-4">
          <dt className="flex items-center gap-1.5 text-xs text-gray-400">
            <DollarSign className="h-3.5 w-3.5" />
            Presupuesto
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-gray-900">
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(project.budget)}
          </dd>
        </div>
      </dl>

      <section className="space-y-2">
        <h2 className="flex items-center gap-1.5 text-xs text-gray-400">
          <FileText className="h-3.5 w-3.5" />
          Descripcion
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
          {project.description}
        </p>
      </section>
    </article>
  );
}