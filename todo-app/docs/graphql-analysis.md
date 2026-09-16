# Análisis teórico: GraphQL y TaskFlow

## Explicación sencilla de la Parte 8 de Full Stack Open

GraphQL es una alternativa para crear APIs. En vez de tener varios endpoints con respuestas fijas, el cliente envía una consulta describiendo los datos exactos que necesita. El servidor valida esa consulta contra un esquema y devuelve únicamente esos campos. Esto ayuda cuando una vista necesita datos relacionados o cuando una respuesta REST trae demasiada información.

- `query`: leer información.
- `mutation`: crear, actualizar o eliminar información.
- `subscription`: recibir actualizaciones en tiempo real.

## Relación con el miniproyecto

TaskFlow actualmente guarda datos en el navegador. En una futura versión con backend, las tareas podrían sincronizarse mediante una API REST. GraphQL podría ser útil para solicitar tareas, prioridades y estadísticas juntas, pero no se implementa aquí porque el requisito es conservar REST API.

## Mejor candidato para GraphQL

El mejor candidato sería `GET /api/tasks?filter=pending&include=statistics`. La pantalla necesita la lista filtrada y los contadores de total, pendientes y completadas. Con GraphQL, una consulta podría pedir esos campos en una sola operación y evitar datos innecesarios. Se conserva REST porque el alcance actual es local, la estructura es sencilla y cambiar a GraphQL no aporta una ventaja necesaria para esta entrega.
