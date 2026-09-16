import { Container, Grid } from '@mui/material';
import SectionHeader from '../components/SectionHeader';
import InfoCard from '../components/InfoCard';
import { EducationView } from '../types';
export default function ToolsPage({ data }: { data: EducationView }) { return <Container maxWidth="lg" sx={{ py: 10 }}><SectionHeader eyebrow="03 · Herramientas" title="Ideas que cambiaron la supervivencia" text="La tecnología comenzó con piedra, madera, fuego y la observación del entorno." /><Grid container spacing={3}>{data.herramientas.map((item) => <Grid item xs={12} sm={6} md={4} key={item.id}><InfoCard icon={item.icon} label={item.use} title={item.name} text={item.description} /></Grid>)}</Grid></Container>; }
