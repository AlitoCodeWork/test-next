"use client";

import { mockProjects } from "@/lib/mock-projects";
import { CreateProjectInput, Project } from "@/types/project";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "project-dashboard-projects-v1";

interface ProjectsContextValue {
  projects: Project[];
  isHydrated: boolean;
  addProject: (input: CreateProjectInput) => string;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          setProjects(JSON.parse(raw) as Project[]);
        } catch {
          setProjects(mockProjects);
        }
      } else {
        setProjects(mockProjects);
      }
      setIsHydrated(true);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, isHydrated]);

  const addProject = useCallback((input: CreateProjectInput) => {
    const id = `p-${Date.now()}`;
    const nextProject: Project = {
      id,
      title: input.title,
      owner: input.owner,
      status: input.status,
      budget: input.budget,
      description: input.description,
      date: new Date().toISOString().slice(0, 10),
    };

    setProjects((prev) => [nextProject, ...prev]);
    return id;
  }, []);

  const getProjectById = useCallback(
    (id: string) => projects.find((project) => project.id === id),
    [projects],
  );

  const value = useMemo(
    () => ({ projects, isHydrated, addProject, getProjectById }),
    [projects, isHydrated, addProject, getProjectById],
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects debe usarse dentro de ProjectsProvider");
  }
  return context;
}