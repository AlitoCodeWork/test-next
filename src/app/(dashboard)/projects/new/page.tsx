"use client";

import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectStatus } from "@/types/project";
import { useProjects } from "../../projects-context";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";

const statusOptions: ProjectStatus[] = ["Activo", "Completado", "En pausa"];

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjects();

  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Activo");
  const [budget, setBudget] = useState("10000");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMessage(null);

      const parsedBudget = Number(budget);
      if (!title.trim() || !owner.trim() || !description.trim()) {
        setErrorMessage("Por favor, completa todos los campos obligatorios.");
        return;
      }

      if (Number.isNaN(parsedBudget) || parsedBudget <= 0) {
        setErrorMessage("El presupuesto debe ser un numero mayor a 0.");
        return;
      }

      const newId = addProject({
        title: title.trim(),
        owner: owner.trim(),
        status,
        budget: parsedBudget,
        description: description.trim(),
      });

      router.push(`/projects/${newId}`);
    },
    [addProject, budget, description, owner, router, status, title],
  );

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Proyectos
        </Link>
        <h1 className="mt-4 text-lg font-semibold text-gray-900">Nuevo proyecto</h1>
        <p className="mt-0.5 text-sm text-gray-500">Completa los datos para registrar el proyecto.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-gray-700">Titulo *</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej: Migracion de base de datos"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-700">Responsable *</span>
            <input
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              placeholder="Ej: Ana Perez"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-gray-700">Presupuesto (USD) *</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
              <input
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                type="number"
                min={1}
                className="w-full rounded-md border border-gray-200 bg-white py-2 pl-7 pr-3 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-gray-700">Estado</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as ProjectStatus)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-gray-700">Descripcion *</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Detalla los objetivos y alcance del proyecto..."
              rows={4}
              className="resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            />
          </label>
        </div>

        {errorMessage ? (
          <div className="flex items-center gap-2 rounded-md border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{errorMessage}</p>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          <Link
            href="/projects"
            className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            <Save className="h-3.5 w-3.5" />
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}