export interface HomoSapiens { id: string; name: string; period: string; description: string; image: string; characteristics: string[]; }
export interface Evolucion { id: string; title: string; period: string; description: string; image: string; }
export interface Herramienta { id: string; name: string; use: string; description: string; icon: string; }
export interface Curiosidad { id: string; title: string; text: string; category: string; }
export interface EducationalData { humanos: HomoSapiens[]; evolucion: Evolucion[]; herramientas: Herramienta[]; curiosidades: Curiosidad[]; }
export type Section = 'inicio' | 'evolucion' | 'vida' | 'herramientas' | 'curiosidades';
