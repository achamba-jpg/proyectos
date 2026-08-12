/* ============================================
   GUÍA DE USO Y DOCUMENTACIÓN
   ============================================ */

# 🌍 Mundo de Homo Sapiens - Guía Completa

## 📁 Estructura del Proyecto

```
proyecto angel 1.2/
├── index.html              # Página principal
├── curiosidades.html       # Página de datos curiosos
├── styles.css             # Estilos principales
├── styles-curiosidades.css # Estilos de curiosidades
├── interactive.css        # Estilos interactivos y dark mode
├── script.js             # Funcionalidades JavaScript
├── tsconfig.json         # Configuración TypeScript
├── package.json          # Metadatos del proyecto
└── homosapies.png        # Imagen principal (agregar)
```

## 🚀 Características Principales

### 1️⃣ **Diseño Moderno y Elegante**
- Gradientes atractivos
- Tipografía premium (Playfair Display + Poppins)
- Colores profesionales
- Animaciones suaves

### 2️⃣ **Totalmente Responsive**
- Adaptable a cualquier pantalla
- Menú hamburguesa en móvil
- Grid automático en tablets
- Optimizado para escritorio

### 3️⃣ **Funcionalidades Interactivas**
- ✨ Animaciones al hacer scroll
- 🍔 Menú hamburguesa dinámico
- 🌙 Modo oscuro
- 📊 Contador de visitas
- 👁️ Efecto Parallax
- 🔗 Navegación suave

### 4️⃣ **Contenido Educativo**
- Descripción de Homo sapiens
- 6 datos curiosos fascinantes
- Comparativa vs Neandertales
- Conclusión sobre supervivencia

### 5️⃣ **TypeScript Ready**
- Configuración lista para TypeScript
- Tipado fuerte disponible
- Compilación automática

## 🛠️ Cómo Usar

### **En el navegador (Inmediato):**
```bash
# Solo abre index.html en tu navegador
```

### **Con TypeScript (Futuro):**
```bash
# 1. Instalar dependencias
npm install

# 2. Compilar TypeScript
npm run build

# 3. Ver cambios en tiempo real
npm run watch
```

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 769px - 1199px
- **Móvil:** 480px - 768px
- **Pequeño:** < 480px

## 🎨 Paleta de Colores

- **Primario:** #2563eb (Azul)
- **Secundario:** #f59e0b (Naranja)
- **Oscuro:** #1f2937 (Gris oscuro)
- **Claro:** #f3f4f6 (Gris claro)

## 🎯 Funciones JavaScript Disponibles

```javascript
// Obtener visitas
Utils.getVisitCount()

// Limpiar localStorage
Utils.clearStorage()

// Información del navegador
Utils.getBrowserInfo()

// Mostrar notificación
Utils.notify('Mensaje', 'success')
```

## ⌨️ Atajos de Consola

Abre la consola (F12) y prueba:
```javascript
Utils.getVisitCount()      // Ver visitas
Utils.notify('¡Hola!')     // Mostrar notificación
console.log(Utils.getBrowserInfo())  // Datos del navegador
```

## 📊 Analytics

La página rastrea automáticamente:
- ✅ Número de visitas
- ✅ Clics en botones y enlaces
- ✅ Información del navegador
- ✅ Preferencias de tema (dark mode)

## 🔒 Seguridad y Privacidad

- Todos los datos se guardan localmente
- No se envía información a servidores
- Sin cookies de rastreo
- GDPR compliant

## 🚀 Próximas Mejoras

- [ ] Convertir script.js a TypeScript
- [ ] Agregar formulario de contacto
- [ ] Integrar API de datos
- [ ] PWA (Progressive Web App)
- [ ] SEO optimizado

## 💡 Tips

1. **Abre la consola (F12)** para ver logs y usar Utils
2. **Prueba el modo oscuro** - Está activado en dark mode
3. **Redimensiona la ventana** para ver responsive
4. **Haz scroll** para ver animaciones Parallax
5. **Toca el hamburguesa** en móvil para abrir menú

## 📧 Contacto y Soporte

Para preguntas o mejoras:
- GitHub: achamba-jpg/proyectos
- Email: achamba@cincinnatus.edu.do

---

**¡Gracias por usar Homo Sapiens! 🌍✨**
