# 🧬 Mundo de los Homo sapiens

## Descripción

Miniproyecto educativo sobre la evolución, características y formas de vida de los Homo sapiens. La interfaz combina una identidad visual inspirada en cuevas, tierra, piedra y fuego con una experiencia web moderna, accesible y responsive.

## Tecnologías

- React + Vite
- TypeScript
- Redux Toolkit y React Redux
- Material UI (MUI) e iconos MUI
- REST API con `fetch`
- HTML/CSS mediante React y Material UI

## Ejecutar localmente

```bash
cd todo-app
npm install
npm run dev
```

Comprobar producción:

```bash
npm run build
npm run preview
```

## Navegación

La aplicación utiliza rutas por hash para funcionar sin configuración adicional de servidor:

- `#/` — Inicio
- `#/evolucion` — Evolución
- `#/vida` — Vida cotidiana
- `#/herramientas` — Herramientas
- `#/curiosidades` — Curiosidades

## Estructura

```text
src/
├── components/       # Navegación, encabezados y tarjetas reutilizables
├── pages/            # Una página para cada sección educativa
├── services/         # Servicios de comunicación REST
├── types/            # Interfaces TypeScript
├── store/            # Redux Toolkit y slices
├── hooks/            # Hooks tipados de Redux
├── theme/            # Tema visual de Material UI
├── App.tsx
└── main.tsx
```

## REST API

El servicio `src/services/api.ts` intenta consumir:

- `GET /api/humanos`
- `GET /api/evolucion`
- `GET /api/herramientas`
- `GET /api/curiosidades`

Se puede configurar una URL base con `VITE_API_URL`. Si el backend no está disponible, se muestran datos educativos locales de respaldo para que la demostración siga funcionando.

## Redux y TypeScript

Redux administra las colecciones educativas y los estados `idle`, `loading`, `succeeded` y `failed`. Las interfaces `HomoSapiens`, `Evolucion`, `Herramienta` y `Curiosidad` garantizan datos tipados en toda la aplicación.

## Material UI

Se utilizan visiblemente `AppBar`, `Toolbar`, `Button`, `Card`, `CardContent`, `Typography`, `Grid`, `Container`, `Dialog`, `Alert`, `CircularProgress`, `Drawer`, `IconButton` y `Chip`. El tema usa tonos arena, terracota, marrón piedra y dorado fuego.

## GraphQL: análisis teórico

GraphQL **no está implementado** y no reemplaza REST. El endpoint `GET /api/evolucion` sería el mejor candidato para beneficiarse: una pantalla podría pedir periodo, imagen, características, herramientas y relaciones entre especies en una sola consulta, solicitando solo los campos necesarios. Para este miniproyecto REST es suficiente, sencillo y cumple el requisito arquitectónico.

## Evidencias de entrega

1. Ejecutar `npm run dev` y capturar la página Inicio.
2. Capturar las páginas Evolución, Vida cotidiana y Herramientas mostrando las tarjetas MUI.
3. Capturar el menú responsive abierto en tamaño móvil o el Drawer.
4. Entregar el párrafo de GraphQL de este README como explicación teórica. No es necesario tomar una foto de esa explicación.

## Revisión final

- [x] React, TypeScript, Redux y Material UI implementados.
- [x] REST API separada en servicios.
- [x] Sin implementación de GraphQL.
- [x] Páginas separadas por sección.
- [x] Diseño responsive.
- [x] Datos de respaldo para demostración sin backend.
