import { ProjectStatus } from "@/types/project";

const config: Record<ProjectStatus, { dot: string; label: string }> = {
  Activo: { dot: "bg-emerald-500", label: "text-gray-700" },
  Completado: { dot: "bg-gray-400", label: "text-gray-500" },
  "En pausa": { dot: "bg-amber-400", label: "text-gray-700" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { dot, label } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${label}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
