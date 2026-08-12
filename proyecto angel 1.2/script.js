/* ============================================
   SCRIPT PRINCIPAL - FUNCIONALIDADES INTERACTIVAS
   ============================================ */

// ============================================
// 1. MENÚ HAMBURGUESA - Navegación móvil
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abrir/cerrar menú
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// ============================================
// 2. NAVEGACIÓN ACTIVA - Resaltar enlace actual
// ============================================
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al cargar
updateActiveNavLink();

// ============================================
// 3. SCROLL SUAVE - Desplazamiento elegante
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // No aplicar si es un enlace vacío o "#"
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 4. CONTADOR DE VISITAS - localStorage
// ============================================
function initializeVisitCounter() {
    // Obtener contador del localStorage
    let visitCount = localStorage.getItem('visitCount');
    
    if (!visitCount) {
        visitCount = 0;
    }
    
    // Incrementar contador
    visitCount = parseInt(visitCount) + 1;
    
    // Guardar en localStorage
    localStorage.setItem('visitCount', visitCount);
    
    // Mostrar en consola (puedes agregarlo a la página si quieres)
    console.log(`🌍 Visitas a esta página: ${visitCount}`);
    
    // Opcional: mostrar en un elemento HTML
    const counterElement = document.getElementById('visit-counter');
    if (counterElement) {
        counterElement.textContent = visitCount;
    }
}

// Ejecutar al cargar
initializeVisitCounter();

// ============================================
// 5. ANIMACIÓN AL SCROLL - Efectos dinámicos
// ============================================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas
    document.querySelectorAll('.feature-card, .curiosidad-card, .comparison-item').forEach(el => {
        observer.observe(el);
    });
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ============================================
// 6. EFECTO PARALLAX - Parallax en hero
// ============================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image img');
    
    if (!heroImage) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && window.innerWidth > 768) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

initParallax();

// ============================================
// 7. VALIDACIÓN DE FORMULARIO (si lo agregas)
// ============================================
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    // Validar email
    if (!email.value.includes('@')) {
        alert('❌ Por favor ingresa un email válido');
        return false;
    }
    
    // Validar mensaje
    if (message.value.length < 10) {
        alert('❌ El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    alert('✅ ¡Formulario enviado exitosamente!');
    form.reset();
    return false;
}

// ============================================
// 8. MODO OSCURO (Bonus)
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (!darkModeToggle) return;
    
    // Cargar preferencia guardada
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const newState = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', newState);
        darkModeToggle.textContent = newState ? '☀️' : '🌙';
    });
}

initDarkMode();

// ============================================
// 9. ANALÍTICA SIMPLE - Rastrear clics
// ============================================
function trackClickEvents() {
    document.querySelectorAll('.btn, .nav-link').forEach(element => {
        element.addEventListener('click', function() {
            const clicked = this.textContent.trim();
            const timestamp = new Date().toLocaleTimeString();
            
            // Guardar en consola (puedes enviar a un servidor)
            console.log(`⏰ [${timestamp}] Click en: ${clicked}`);
        });
    });
}

trackClickEvents();

// ============================================
// 10. FUNCIÓN HELPER - Utilidades
// ============================================
const Utils = {
    // Obtener todas las visitas guardadas
    getVisitCount: function() {
        return localStorage.getItem('visitCount') || 0;
    },
    
    // Limpiar datos guardados
    clearStorage: function() {
        localStorage.clear();
        console.log('✅ Storage limpiado');
    },
    
    // Obtener información del navegador
    getBrowserInfo: function() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            onLine: navigator.onLine
        };
    },
    
    // Función para mostrar notificaciones
    notify: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ============================================
// EXPORTAR UTILS (para usar en consola)
// ============================================
window.Utils = Utils;

// ============================================
// INICIALIZACIÓN FINAL
// ============================================
console.log('%c🌍 Bienvenido a Homo Sapiens', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cTu página está cargada con funcionalidades interactivas ✨', 'color: #f59e0b; font-size: 14px;');
console.log('%cVisitas: ' + Utils.getVisitCount(), 'color: #10b981; font-size: 12px;');
