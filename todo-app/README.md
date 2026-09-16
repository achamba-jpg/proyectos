# 🧬 Mundo de los Homo sapiens

Aplicación educativa moderna sobre la evolución humana, construida con React, TypeScript, Redux Toolkit y Material UI. La interfaz combina una estética de prehistoria (tierra, piedra, fuego y naturaleza) con una experiencia web profesional y responsive.

## Ejecutar

```bash
cd todo-app
npm install
npm run dev
npm run build
```

## Estructura

- `src/components/`: componentes visuales reutilizables.
- `src/pages/`: páginas que pueden crecer en futuras versiones.
- `src/services/api.ts`: servicios REST separados del componente principal.
- `src/types/`: interfaces TypeScript.
- `src/store/`: Redux Toolkit y estado global.
- `src/hooks/`: hooks tipados de Redux.
- `src/theme/`: tema visual MUI prehistórico.

## REST API

La app intenta consumir estos endpoints con `fetch`:

- `GET /api/humanos`
- `GET /api/evolucion`
- `GET /api/herramientas`
- `GET /api/curiosidades`

Si el backend no está disponible, utiliza datos educativos de respaldo para que la interfaz siga funcionando. Para conectar un backend real se puede definir `VITE_API_URL`.

## Redux y TypeScript

Redux gestiona las listas, estado de carga y errores de las peticiones. TypeScript define `HomoSapiens`, `Evolucion`, `Herramienta` y `Curiosidad`.

## GraphQL: análisis teórico

GraphQL no se implementa y REST API se conserva. El endpoint `GET /api/evolucion` podría beneficiarse de GraphQL si una pantalla necesitara al mismo tiempo información del periodo, imagen, características, herramientas y relaciones entre especies. GraphQL permitiría pedir solo esos campos en una consulta, pero REST es suficiente y cumple el objetivo de esta entrega.
