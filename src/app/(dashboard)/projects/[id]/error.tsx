"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-red-100 bg-red-50 p-5">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
      <div className="flex-1 space-y-3">
        <div>
          <p className="text-sm font-medium text-red-800">Error al cargar el proyecto</p>
          <p className="mt-0.5 text-sm text-red-600">
            {error.message || "Ocurrio un problema inesperado."}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
        >
          <RefreshCcw className="h-3 w-3" />
          Reintentar
        </button>
      </div>
    </div>
  );
}