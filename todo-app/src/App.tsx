import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { loadEducation } from './store/educationSlice';
import HomePage from './pages/HomePage';
import EvolutionPage from './pages/EvolutionPage';
import DailyLifePage from './pages/DailyLifePage';
import ToolsPage from './pages/ToolsPage';
import CuriositiesPage from './pages/CuriositiesPage';
import { Section } from './types';

function getSection(): Section {
  const value = window.location.hash.replace('#/', '').replace('#', '') as Section;
  return ['evolucion', 'vida', 'herramientas', 'curiosidades'].includes(value) ? value : 'inicio';
}

export default function App() {
  const dispatch = useAppDispatch();
  const [section, setSection] = useState<Section>(getSection);
  const data = useAppSelector((state) => state.education);

  useEffect(() => {
    if (data.status === 'idle') dispatch(loadEducation());
  }, [data.status, dispatch]);

  useEffect(() => {
    const onHashChange = () => setSection(getSection());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const changeSection = (next: Section) => {
    window.location.hash = next === 'inicio' ? '/' : `/${next}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <Box sx={{ minHeight: '100vh' }}>
    <Navigation active={section} onNavigate={changeSection} />
    {section === 'inicio' && <HomePage data={data} onNavigate={changeSection} />}
    {section === 'evolucion' && <EvolutionPage data={data} />}
    {section === 'vida' && <DailyLifePage />}
    {section === 'herramientas' && <ToolsPage data={data} />}
    {section === 'curiosidades' && <CuriositiesPage data={data} />}
    <Box component="footer" sx={{ bgcolor: '#292019', color: '#f5efe6', textAlign: 'center', py: 5, px: 2 }}>
      <Box component="p" sx={{ opacity: .8, m: 0 }}>🧬 Mundo de los Homo sapiens · Prehistoria + tecnología moderna</Box>
    </Box>
  </Box>;
}
