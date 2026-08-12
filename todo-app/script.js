/* ============================================
   APLICACIÓN TODO LIST
   ============================================ */

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    // Inicialización
    init() {
        this.loadTasks();
        this.setupEventListeners();
        this.render();
        console.log('🚀 TodoApp iniciada');
    }

    // Event Listeners
    setupEventListeners() {
        // Input y botón agregar
        const input = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');

        addBtn.addEventListener('click', () => this.addTask());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Botones rápidos
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
        document.getElementById('sortBtn').addEventListener('click', () => this.sortTasks());

        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Exportar/Importar
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => this.importData());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAll());
    }

    // Agregar tarea
    addTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();

        if (!text) {
            this.shake(input);
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString('es-ES')
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        input.value = '';
        input.focus();

        console.log('✅ Tarea agregada:', task);
    }

    // Toggle tarea completada
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            console.log('🔄 Tarea marcada:', task);
        }
    }

    // Eliminar tarea
    deleteTask(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            console.log('🗑️ Tarea eliminada');
        }
    }

    // Cambiar prioridad
    changePriority(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const priorities = ['low', 'medium', 'high'];
            const currentIndex = priorities.indexOf(task.priority);
            task.priority = priorities[(currentIndex + 1) % priorities.length];
            this.saveTasks();
            this.render();
        }
    }

    // Limpiar tareas completadas
    clearCompleted() {
        if (confirm('¿Eliminar todas las tareas completadas?')) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            console.log('🧹 Tareas completadas eliminadas');
        }
    }

    // Ordenar tareas
    sortTasks() {
        this.tasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        this.saveTasks();
        this.render();
        console.log('✨ Tareas ordenadas por prioridad');
    }

    // Establecer filtro
    setFilter(filter) {
        this.currentFilter = filter;

        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.render();
        console.log('🔍 Filtro aplicado:', filter);
    }

    // Obtener tareas filtradas
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    // Actualizar estadísticas
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('completedTasks').textContent = completed;
    }

    // Renderizar lista
    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        // Actualizar estadísticas
        this.updateStats();

        // Mostrar/ocultar estado vacío
        if (filteredTasks.length === 0) {
            taskList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-date">📅 ${task.createdAt}</div>
                </div>
                <span class="task-priority ${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="action-btn" onclick="app.changePriority(${task.id})" title="Cambiar prioridad">⭐</button>
                    <button class="action-btn delete-btn" onclick="app.deleteTask(${task.id})" title="Eliminar">🗑️</button>
                </div>
            </li>
        `).join('');
    }

    // Guardar en localStorage
    saveTasks() {
        localStorage.setItem('todoApp_tasks', JSON.stringify(this.tasks));
        console.log('💾 Tareas guardadas en localStorage');
    }

    // Cargar desde localStorage
    loadTasks() {
        const stored = localStorage.getItem('todoApp_tasks');
        if (stored) {
            this.tasks = JSON.parse(stored);
            console.log('📂 Tareas cargadas desde localStorage');
        }
    }

    // Exportar datos
    exportData() {
        const data = {
            tasks: this.tasks,
            exportedAt: new Date().toLocaleString('es-ES'),
            totalTasks: this.tasks.length
        };

        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tareas_${Date.now()}.json`;
        link.click();

        console.log('📥 Datos exportados');
        alert('✅ Datos exportados exitosamente');
    }

    // Importar datos
    importData() {
        document.getElementById('fileInput').click();
        document.getElementById('fileInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data = JSON.parse(event.target.result);
                        this.tasks = [...this.tasks, ...data.tasks];
                        this.saveTasks();
                        this.render();
                        console.log('📤 Datos importados');
                        alert('✅ Datos importados exitosamente');
                    } catch (error) {
                        console.error('❌ Error al importar:', error);
                        alert('❌ Error al importar el archivo');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Reiniciar aplicación
    resetAll() {
        if (confirm('⚠️ Esto eliminará TODAS las tareas. ¿Estás seguro?')) {
            this.tasks = [];
            localStorage.removeItem('todoApp_tasks');
            this.render();
            console.log('🔄 Aplicación reiniciada');
            alert('✅ Aplicación reiniciada');
        }
    }

    // Utilidad: escapar HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Animación shake
    shake(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 300);
    }
}

// Inicializar aplicación
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});

// Guardar tareas al cerrar ventana
window.addEventListener('beforeunload', () => {
    if (app) app.saveTasks();
});