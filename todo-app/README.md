# 📝 TaskFlow — Todo App profesional

Aplicación de gestión de tareas migrada a **React + Redux Toolkit + TypeScript + Material UI**. La migración conserva las funciones de la versión original: crear, completar, eliminar, priorizar, filtrar, ordenar, limpiar completadas, importar/exportar JSON, reiniciar y guardar en `localStorage`.

## Ejecutar

```bash
cd todo-app
npm install
npm run dev
```

Para comprobar la compilación de producción:

```bash
npm run build
```

## Arquitectura

- **React + TypeScript:** componentes reutilizables y tipado de tareas, prioridades y filtros.
- **Redux Toolkit:** estado global predecible en `src/taskSlice.ts`; la suscripción de `src/store.ts` persiste cambios en `localStorage`.
- **Material UI:** `AppBar`, `Card`, `TextField`, `Button`, `Tabs`, `Chip`, `Dialog`, `Menu`, `List` y `Alert` para una interfaz responsive.
- **REST API:** se mantiene como arquitectura para una futura conexión con backend. Esta versión no agrega una API ficticia ni sustituye REST por GraphQL.

## Parte 8 de Full Stack Open: GraphQL

GraphQL permite que el cliente solicite exactamente los campos que necesita mediante una consulta contra un único endpoint. El servidor expone un esquema tipado y resuelve esos datos, lo que puede evitar respuestas con información innecesaria o varias peticiones REST. Las operaciones principales son consultas (`query`), modificaciones (`mutation`) y, cuando se requiere tiempo real, suscripciones (`subscription`).

La relación con este miniproyecto es conceptual: si las tareas vivieran en un backend, GraphQL podría entregar en una sola consulta la lista, sus prioridades y estadísticas. Sin embargo, el requisito del proyecto es conservar REST; por eso no se instala Apollo ni se cambia la arquitectura.

### Endpoint que más podría beneficiarse

El endpoint hipotético `GET /api/tasks?filter=pending&include=statistics` sería el mejor candidato. Una consulta GraphQL podría pedir tareas pendientes, `id`, `text`, `priority` y los contadores de total/completadas en una sola respuesta, sin enviar campos que la pantalla no usa. Aun así, para este miniproyecto se mantiene REST porque es más simple, suficiente y cumple la arquitectura solicitada.

## Evidencias para entregar

1. Ejecuta `npm run dev` y toma una captura de la pantalla principal con las tarjetas de estadísticas, formulario, pestañas y tareas.
2. Toma otra captura con el menú de tres puntos abierto para evidenciar los componentes Material UI.
3. Puedes usar el párrafo de la sección “Endpoint que más podría beneficiarse” como explicación breve de GraphQL. No es necesario tomar una foto de esa parte.
