// ============================================
// VERSIÓN TYPESCRIPT DEL SCRIPT
// ============================================

// Tipos y Interfaces
interface VisitData {
    count: number;
    firstVisit: string;
    lastVisit: string;
}

interface BrowserInfo {
    userAgent: string;
    language: string;
    onLine: boolean;
}

interface NotificationOptions {
    type: 'success' | 'error' | 'info';
    duration?: number;
}

// ============================================
// CLASE PRINCIPAL
// ============================================
class HomoSapiensApp {
    private visitCount: number = 0;
    private darkModeEnabled: boolean = false;

    constructor() {
        this.init();
    }

    // Inicialización
    private init(): void {
        this.loadVisitCount();
        this.setupHamburgerMenu();
        this.updateActiveNavLink();
        this.setupSmoothScroll();
        this.observeElements();
        this.initParallax();
        this.trackClickEvents();
        this.logStartup();
    }

    // Menú hamburguesa
    private setupHamburgerMenu(): void {
        const hamburger = document.querySelector('.hamburger') as HTMLElement;
        const navMenu = document.querySelector('.nav-menu') as HTMLElement;
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu?.classList.remove('active');
                hamburger?.classList.remove('active');
            });
        });
    }

    // Navegación activa
    private updateActiveNavLink(): void {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href?.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }

    // Scroll suave
    private setupSmoothScroll(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const href = (anchor as HTMLAnchorElement).getAttribute('href');

                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Contador de visitas
    private loadVisitCount(): void {
        const stored = localStorage.getItem('visitCount');
        this.visitCount = stored ? parseInt(stored) : 0;
        this.visitCount++;
        localStorage.setItem('visitCount', this.visitCount.toString());

        const counter = document.getElementById('visit-counter');
        if (counter) {
            counter.textContent = this.visitCount.toString();
        }
    }

    // Observar elementos
    private observeElements(): void {
        const options: IntersectionObserverInit = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.feature-card, .curiosidad-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Parallax
    private initParallax(): void {
        const heroImage = document.querySelector('.hero-image img') as HTMLImageElement;
        const heroSection = document.querySelector('.hero');

        if (!heroImage || !heroSection) return;

        window.addEventListener('scroll', () => {
            const scrollPos = window.pageYOffset;
            if (window.innerWidth > 768) {
                heroImage.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }
        });
    }

    // Rastrear clics
    private trackClickEvents(): void {
        document.querySelectorAll('.btn, .nav-link').forEach(element => {
            element.addEventListener('click', () => {
                const clicked = element.textContent?.trim();
                const timestamp = new Date().toLocaleTimeString();
                console.log(`⏰ [${timestamp}] Click en: ${clicked}`);
            });
        });
    }

    // Log de inicio
    private logStartup(): void {
        console.log('%c🌍 Homo Sapiens - Versión TypeScript', 
            'color: #2563eb; font-size: 20px; font-weight: bold;');
        console.log('%cVisitas: ' + this.visitCount, 
            'color: #10b981; font-size: 12px;');
    }

    // Métodos públicos
    public getVisitCount(): number {
        return this.visitCount;
    }

    public getNotification(message: string, options?: NotificationOptions): void {
        const { type = 'info', duration = 3000 } = options || {};
        
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

        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    public getBrowserInfo(): BrowserInfo {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            onLine: navigator.onLine
        };
    }

    public clearStorage(): void {
        localStorage.clear();
        console.log('✅ Storage limpiado');
        location.reload();
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const app = new HomoSapiensApp();
    (window as any).app = app; // Disponible en consola
});
