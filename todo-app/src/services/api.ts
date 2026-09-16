import { Curiosidad, Evolucion, Herramienta, HomoSapiens } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';
const images = {
  evolution: 'https://raw.githubusercontent.com/achamba-jpg/proyectos/main/proyecto%20angel%201.2/homosapies.png',
  neanderthal: 'https://raw.githubusercontent.com/achamba-jpg/proyectos/main/proyecto%20angel%201.2/neandertales.jpg',
  origin: 'https://raw.githubusercontent.com/achamba-jpg/proyectos/main/proyecto%20angel%201.2/neandertalesorgin.jpg',
};

async function get<T>(endpoint: string, fallback: T): Promise<T> {
  try { const response = await fetch(`${API_URL}${endpoint}`); if (!response.ok) throw new Error('API no disponible'); return await response.json() as T; }
  catch { return fallback; }
}

export const api = {
  humanos: () => get<HomoSapiens[]>('/humanos', [{ id: 'sapiens', name: 'Homo sapiens', period: 'Hace 300.000 años - actualidad', description: 'Nuestra especie desarrolló lenguaje, cooperación, herramientas y expresiones culturales complejas.', image: images.evolution, characteristics: ['Lenguaje simbólico', 'Cooperación social', 'Pensamiento creativo'] }]),
  evolucion: () => get<Evolucion[]>('/evolucion', [{ id: '1', title: 'Origen en África', period: 'Hace 300.000 años', description: 'Aparecen los primeros Homo sapiens con capacidades de adaptación y comunicación.', image: images.evolution }, { id: '2', title: 'Expansión humana', period: 'Hace 70.000 años', description: 'Nuestra especie explora nuevos territorios y se adapta a diferentes climas.', image: images.origin }, { id: '3', title: 'Encuentro de especies', period: 'Hace 40.000 años', description: 'Homo sapiens y neandertales compartieron territorios y parte de su historia.', image: images.neanderthal }]),
  herramientas: () => get<Herramienta[]>('/herramientas', [{ id: '1', name: 'Punta de piedra', use: 'Caza y corte', description: 'Piezas talladas para conseguir alimento y fabricar otras herramientas.', icon: '🪨' }, { id: '2', name: 'Lanza', use: 'Caza', description: 'Una herramienta ligera que aumentó la distancia y seguridad durante la caza.', icon: '🏹' }, { id: '3', name: 'Fuego', use: 'Cocina y protección', description: 'Permitió cocinar alimentos, iluminar refugios y protegerse del frío.', icon: '🔥' }]),
  curiosidades: () => get<Curiosidad[]>('/curiosidades', [{ id: '1', title: 'ADN compartido', text: 'Muchas personas actuales conservan un pequeño porcentaje de ADN neandertal.', category: 'Genética' }, { id: '2', title: 'Arte rupestre', text: 'Las pinturas en cuevas muestran que los primeros humanos comunicaban ideas mediante símbolos.', category: 'Cultura' }, { id: '3', title: 'La cooperación', text: 'Compartir conocimientos y alimentos fue clave para sobrevivir en ambientes difíciles.', category: 'Sociedad' }]),
};
