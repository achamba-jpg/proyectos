# 📝 Aplicación Todo List

## Descripción

Aplicación de gestión de tareas moderna y funcional con almacenamiento local (localStorage). Diseñada para ser simple, intuitiva y completamente responsiva.

## ✨ Características

### 📌 Funcionalidades Principales
- ✅ **Agregar tareas** - Agrega nuevas tareas con Enter o botón
- ✅ **Completar tareas** - Marca tareas como completadas
- ✅ **Eliminar tareas** - Borra tareas individuales
- ✅ **Establecer prioridad** - Alto, Medio, Bajo
- ✅ **Filtrar tareas** - Todas, Pendientes, Completadas
- ✅ **Ordenar** - Ordena por prioridad
- ✅ **Limpiar completadas** - Elimina todas las tareas completadas
- ✅ **Estadísticas** - Muestra total, pendientes y completadas
- ✅ **Exportar datos** - Descarga tareas como JSON
- ✅ **Importar datos** - Carga tareas desde archivo JSON
- ✅ **LocalStorage** - Guarda automáticamente en navegador

### 🎨 Diseño
- Interfaz moderna y colorida
- Totalmente responsiva (móvil, tablet, desktop)
- Animaciones suaves
- Gradientes atractivos
- Dark-mode ready

## 🚀 Cómo Usar

### Instalación
```bash
# Solo abre index.html en tu navegador
open todo-app/index.html
```

### Uso Básico

1. **Agregar tarea**
   ```
   Escribe en el input y presiona Enter o click en Agregar
   ```

2. **Completar tarea**
   ```
   Click en el checkbox para marcar como completada
   ```

3. **Cambiar prioridad**
   ```
   Click en el botón ⭐ para cambiar entre Alto/Medio/Bajo
   ```

4. **Filtrar**
   ```
   Usa los botones: Todas, Pendientes, Completadas
   ```

5. **Exportar/Importar**
   ```
   Usa los botones en el footer para descargar o cargar tareas
   ```

## 📂 Estructura de Archivos

```
todo-app/
├── index.html       # Estructura HTML
├── styles.css       # Estilos CSS
├── script.js        # Lógica JavaScript
└── README.md        # Este archivo
```

## 💾 Almacenamiento Local

Todas tus tareas se guardan automáticamente en **localStorage** del navegador:
- Las tareas persisten después de cerrar el navegador
- No requiere servidor
- 100% privadas en tu dispositivo

### Datos Guardados
```json
{
  "id": "timestamp",
  "text": "Descripción de la tarea",
  "completed": false,
  "priority": "medium",
  "createdAt": "12/08/2026, 10:30:45"
}
```

## 🎯 Ejemplos de Uso

### Agregar una tarea
```
1. Escribe: "Comprar leche"
2. Presiona Enter
3. ¡Tarea agregada!
```

### Cambiar prioridad
```
1. Click en el botón ⭐ de una tarea
2. Cicla entre: Bajo → Medio → Alto → Bajo
3. Las tareas se reordenan automáticamente
```

### Exportar datos
```
1. Click en "📥 Exportar Datos"
2. Se descarga un archivo tareas_TIMESTAMP.json
3. Guárdalo de forma segura
```

## 🛠️ Opciones Avanzadas

### Limpiar Completadas
- Elimina todas las tareas marcadas como completadas
- Requiere confirmación

### Ordenar
- Ordena todas las tareas por prioridad (Alto → Medio → Bajo)

### Reiniciar
- Borra TODAS las tareas (requiere confirmación)
- Limpia localStorage

## 📊 Estadísticas

La aplicación muestra en tiempo real:
- **Total**: Número de tareas en total
- **Pendientes**: Tareas no completadas
- **Completadas**: Tareas finalizadas

## 🎨 Colores

- **Primario**: #3b82f6 (Azul)
- **Secundario**: #8b5cf6 (Púrpura)
- **Success**: #10b981 (Verde)
- **Danger**: #ef4444 (Rojo)
- **Warning**: #f59e0b (Naranja)

## 📱 Responsive Design

- **Desktop**: >600px - Diseño completo
- **Tablet**: 600px - Interfaz adaptada
- **Móvil**: <600px - Optimizado para pantallas pequeñas

## 🔒 Privacidad

- ✅ Los datos se guardan localmente en tu navegador
- ✅ No se envían datos a servidores
- ✅ No hay cookies de rastreo
- ✅ 100% privado

## 🐛 Solución de Problemas

### Las tareas no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Limpia la caché del navegador
- Intenta en una ventana privada

### No puedo importar datos
- Asegúrate que el archivo sea JSON válido
- Verifica el formato de los datos

### La aplicación no responde
- Recarga la página
- Limpia el localStorage
- Reinicia el navegador

## 📈 Próximas Mejoras

- [ ] Dark mode completo
- [ ] Categorías de tareas
- [ ] Recordatorios
- [ ] Sincronización en la nube
- [ ] Editar tareas inline
- [ ] Búsqueda de tareas
- [ ] Temas personalizables

## 👨‍💻 Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Gradientes)
- JavaScript vanilla (sin frameworks)
- LocalStorage API

## 📄 Licencia

MIT License - Libre para usar y modificar

---

**Creado con ❤️ para gestionar tus tareas de forma simple**

*Última actualización: 12/08/2026*