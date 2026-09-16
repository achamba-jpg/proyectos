import { Curiosidad, Evolucion, Herramienta, HomoSapiens } from '../types';
export interface EducationView { humanos: HomoSapiens[]; evolucion: Evolucion[]; herramientas: Herramienta[]; curiosidades: Curiosidad[]; status: 'idle'|'loading'|'succeeded'|'failed'; error: string | null; }
