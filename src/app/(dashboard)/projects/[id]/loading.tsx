export default function ProjectDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-7">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      <div className="space-y-3">
        <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
      <div className="h-px bg-gray-200" />
      <div className="grid gap-px sm:grid-cols-2">
        <div className="h-20 animate-pulse rounded-l-lg bg-gray-100" />
        <div className="h-20 animate-pulse rounded-r-lg bg-gray-100" />
      </div>
      <div className="h-24 animate-pulse rounded bg-gray-100" />
    </div>
  );
}