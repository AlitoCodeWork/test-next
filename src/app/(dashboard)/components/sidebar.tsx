"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Plus } from "lucide-react";

const links = [
  { href: "/projects", label: "Proyectos", icon: LayoutGrid },
  { href: "/projects/new", label: "Nuevo proyecto", icon: Plus },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-[18px]">
        <span className="text-sm font-semibold text-gray-900 tracking-tight">ProjectHQ</span>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href === "/projects" && pathname.startsWith("/projects/") && pathname !== "/projects/new");

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                active
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-5 py-4">
        <p className="text-xs font-medium text-gray-700">Admin User</p>
        <p className="text-xs text-gray-400 mt-0.5">admin@projecthq.com</p>
      </div>
    </aside>
  );
}