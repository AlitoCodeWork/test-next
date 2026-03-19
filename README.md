# Dashboard de Gestion de Proyectos

Challenge tecnico implementado con Next.js (App Router) y TypeScript.

## Tecnologias

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Instalacion

```bash
npm install
```

## Ejecucion en desarrollo

```bash
npm run dev
```

Abrir en navegador: http://localhost:3000

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Funcionalidades implementadas

- Lista de proyectos con tarjetas (titulo, estado, fecha, responsable).
- Filtro por estado y busqueda por titulo/responsable.
- Vista de detalle por proyecto.
- Formulario de creacion de proyecto.
- Persistencia con localStorage.
- Estado de carga y manejo de error en ruta dinamica.

## Requisitos tecnicos cubiertos

- App Router en carpeta `src/app`.
- Route Group para el dashboard: `src/app/(dashboard)`.
- Nested Layouts:
	- Root Layout global en `src/app/layout.tsx`.
	- Dashboard Layout con sidebar persistente en `src/app/(dashboard)/layout.tsx`.
- Ruta dinamica para detalle: `src/app/(dashboard)/projects/[id]/page.tsx`.
- React Hooks usados:
	- `useState` en filtros y formulario.
	- `useEffect` para hidratacion inicial y guardado en localStorage.
	- `useMemo` para optimizar el filtrado.
	- `useCallback` para handlers y funciones del contexto.
- Client vs Server Components:
	- Server Components: layouts y pagina raiz que redirige (`src/app/page.tsx`).
	- Client Components: contexto de proyectos, sidebar con ruta activa y paginas con interaccion.
- `loading.tsx` y `error.tsx` implementados en la ruta dinamica.

## Estructura principal

```text
src/
	app/
		layout.tsx
		page.tsx
		(dashboard)/
			layout.tsx
			projects-context.tsx
			components/
				sidebar.tsx
			projects/
				page.tsx
				new/
					page.tsx
				[id]/
					page.tsx
					loading.tsx
					error.tsx
	lib/
		mock-projects.ts
	types/
		project.ts
```
