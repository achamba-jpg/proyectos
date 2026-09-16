import { AppBar, Box, Button, Drawer, IconButton, List, ListItemButton, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TerrainIcon from '@mui/icons-material/Terrain';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Section } from '../types';

const items: { id: Section; label: string }[] = [
  { id: 'inicio', label: 'Inicio' }, { id: 'evolucion', label: 'Evolución' },
  { id: 'vida', label: 'Vida cotidiana' }, { id: 'herramientas', label: 'Herramientas' },
  { id: 'curiosidades', label: 'Curiosidades' },
];

export default function Navigation({ active, onNavigate }: { active: Section; onNavigate: (section: Section) => void }) {
  const [open, setOpen] = useState(false);
  const navigate = (section: Section) => { onNavigate(section); setOpen(false); };
  return <>
    <AppBar position="sticky" sx={{ bgcolor: 'rgba(41,32,25,.97)' }}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
        <TerrainIcon sx={{ color: 'secondary.main', mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Georgia, serif', fontWeight: 800 }}>Mundo de los Homo sapiens</Typography>
        <Stack direction="row" spacing={.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {items.map((item) => <Button key={item.id} color="inherit" onClick={() => navigate(item.id)} sx={{ color: active === item.id ? 'secondary.main' : 'inherit', fontWeight: active === item.id ? 800 : 500 }}>{item.label}</Button>)}
        </Stack>
        <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ display: { xs: 'inline-flex', md: 'none' } }}><MenuIcon /></IconButton>
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}><Box sx={{ width: 280, p: 2 }}><IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton><List>{items.map((item) => <ListItemButton selected={active === item.id} key={item.id} onClick={() => navigate(item.id)}><ListItemText primary={item.label} /></ListItemButton>)}</List></Box></Drawer>
  </>;
}
