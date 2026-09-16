import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, AppBar, Avatar, Box, Button, Card, CardContent, Chip, Container,
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton,
  List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper,
  Stack, Tab, Tabs, TextField, Toolbar, Tooltip, Typography,
} from '@mui/material';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { AppDispatch, RootState } from './store';
import { addTask, changePriority, clearCompleted, deleteTask, importTasks, resetTasks, setFilter, sortTasks, toggleTask } from './taskSlice';
import { Filter, Priority, Task } from './types';

const priorityLabel: Record<Priority, string> = { low: 'Baja', medium: 'Media', high: 'Alta' };
const priorityColor: Record<Priority, 'success' | 'warning' | 'error'> = { low: 'success', medium: 'warning', high: 'error' };

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return <Card sx={{ flex: 1, minWidth: 150 }}><CardContent><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h4" sx={{ color, fontWeight: 800, mt: 0.5 }}>{value}</Typography></CardContent></Card>;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const [text, setText] = useState('');
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filteredTasks = useMemo(() => tasks.filter((task) => filter === 'all' || (filter === 'pending' ? !task.completed : task.completed)), [tasks, filter]);
  const completed = tasks.filter((task) => task.completed).length;

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;
    dispatch(addTask(value));
    setText('');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ tasks, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tareas_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const imported = Array.isArray(data) ? data : data.tasks;
        if (Array.isArray(imported)) dispatch(importTasks(imported as Task[]));
      } catch { window.alert('El archivo no contiene un JSON válido.'); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const confirmAction = (message: string, action: () => void) => { if (window.confirm(message)) action(); };

  return <Box sx={{ minHeight: '100vh', pb: 6 }}>
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: 'rgba(255,255,255,.88)' }}>
      <Toolbar sx={{ maxWidth: 1180, width: '100%', mx: 'auto', py: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}><TaskAltRoundedIcon /></Avatar>
        <Box sx={{ flexGrow: 1 }}><Typography variant="h6" color="text.primary" fontWeight={800}>TaskFlow</Typography><Typography variant="caption" color="text.secondary">Organiza. Prioriza. Avanza.</Typography></Box>
        <Button onClick={() => setAboutOpen(true)} color="inherit">Acerca del proyecto</Button>
        <IconButton onClick={(event) => setAnchor(event.currentTarget)}><MoreVertRoundedIcon /></IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          <MenuItem onClick={() => { dispatch(sortTasks()); setAnchor(null); }}><SortRoundedIcon fontSize="small" sx={{ mr: 1 }} />Ordenar por prioridad</MenuItem>
          <MenuItem onClick={() => { confirmAction('¿Eliminar todas las tareas completadas?', () => dispatch(clearCompleted())); setAnchor(null); }}><DeleteOutlineRoundedIcon fontSize="small" sx={{ mr: 1 }} />Limpiar completadas</MenuItem>
          <MenuItem onClick={() => { confirmAction('¿Eliminar todas las tareas?', () => dispatch(resetTasks())); setAnchor(null); }}><RestartAltRoundedIcon fontSize="small" sx={{ mr: 1 }} />Reiniciar aplicación</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 7 } }}>
      <Box sx={{ mb: 4 }}><Chip label="React + Redux + TypeScript + Material UI" color="primary" variant="outlined" sx={{ mb: 2 }} /><Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', md: '3.5rem' } }}>Tu espacio para <Box component="span" sx={{ color: 'primary.main' }}>hacerlo posible.</Box></Typography><Typography color="text.secondary" sx={{ mt: 1, fontSize: '1.1rem' }}>Gestiona tus objetivos diarios con una interfaz clara, rápida y profesional.</Typography></Box>
      <Paper component="form" onSubmit={(event) => { event.preventDefault(); handleAdd(); }} sx={{ p: { xs: 2, md: 3 }, mb: 3, boxShadow: '0 12px 35px rgba(37,99,235,.10)' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}><TextField fullWidth label="Nueva tarea" value={text} onChange={(event) => setText(event.target.value)} placeholder="Ej. Preparar presentación de GraphQL" /><Button type="submit" variant="contained" size="large" startIcon={<AddTaskRoundedIcon />} sx={{ px: 3 }}>Agregar</Button></Stack>
      </Paper>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}><StatCard label="Total de tareas" value={tasks.length} color="#2563eb" /><StatCard label="Pendientes" value={tasks.length - completed} color="#d97706" /><StatCard label="Completadas" value={completed} color="#059669" /></Stack>
      <Card sx={{ mb: 2 }}><Tabs value={filter} onChange={(_, value: Filter) => dispatch(setFilter(value))} variant="fullWidth"><Tab value="all" label="Todas" /><Tab value="pending" label="Pendientes" /><Tab value="completed" label="Completadas" /></Tabs></Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}><Typography variant="h5">Mis tareas</Typography><Chip icon={<FilterListRoundedIcon />} label={`${filteredTasks.length} visibles`} size="small" /></Stack>
      <Card>{filteredTasks.length === 0 ? <CardContent sx={{ textAlign: 'center', py: 8 }}><CheckCircleRoundedIcon sx={{ fontSize: 58, color: 'success.main', opacity: .7 }} /><Typography variant="h6" sx={{ mt: 1 }}>No hay tareas en esta vista</Typography><Typography color="text.secondary">Agrega una tarea para comenzar tu progreso.</Typography></CardContent> : <List disablePadding>{filteredTasks.map((task, index) => <TaskRow key={task.id} task={task} onToggle={() => dispatch(toggleTask(task.id))} onPriority={() => dispatch(changePriority(task.id))} onDelete={() => confirmAction('¿Eliminar esta tarea?', () => dispatch(deleteTask(task.id)))} last={index === filteredTasks.length - 1} />)}</List>}</Card>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end" sx={{ mt: 3 }}><Button startIcon={<DownloadRoundedIcon />} onClick={exportData}>Exportar datos</Button><Button startIcon={<FileUploadRoundedIcon />} onClick={() => fileRef.current?.click()}>Importar datos</Button><input ref={fileRef} hidden type="file" accept=".json" onChange={handleImport} /></Stack>
      <Alert severity="info" sx={{ mt: 4 }}>Tus tareas se guardan automáticamente en <strong>localStorage</strong>. No necesitas un servidor para conservar tus datos.</Alert>
    </Container>
    <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)} maxWidth="sm"><DialogTitle>Arquitectura del miniproyecto</DialogTitle><DialogContent dividers><Typography paragraph>Esta versión conserva todas las funciones de tu Todo App: crear, completar, eliminar, priorizar, filtrar, ordenar, importar, exportar y reiniciar tareas.</Typography><Typography paragraph>La interfaz usa componentes Material UI y el estado global se gestiona con Redux Toolkit y TypeScript.</Typography><Typography paragraph><strong>REST se mantiene como arquitectura.</strong> GraphQL solo se estudia de forma teórica en la documentación del proyecto.</Typography></DialogContent><DialogActions><Button onClick={() => setAboutOpen(false)}>Cerrar</Button></DialogActions></Dialog>
  </Box>;
}

function TaskRow({ task, onToggle, onPriority, onDelete, last }: { task: Task; onToggle: () => void; onPriority: () => void; onDelete: () => void; last: boolean }) {
  return <><ListItem sx={{ px: { xs: 2, md: 3 }, py: 2 }} secondaryAction={<Stack direction="row" spacing={.5}><Tooltip title="Cambiar prioridad"><IconButton onClick={onPriority} color="warning"><StarRoundedIcon /></IconButton></Tooltip><Tooltip title="Eliminar"><IconButton onClick={onDelete} color="error"><DeleteOutlineRoundedIcon /></IconButton></Tooltip></Stack>}><ListItemAvatar><Avatar onClick={onToggle} sx={{ bgcolor: task.completed ? 'success.main' : 'grey.200', color: task.completed ? 'white' : 'text.secondary', cursor: 'pointer' }}>{task.completed ? <CheckCircleRoundedIcon /> : <AddTaskRoundedIcon />}</Avatar></ListItemAvatar><ListItemText primary={<Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : 'text.primary', fontWeight: 600, pr: 12 }}>{task.text}</Typography>} secondary={<Stack direction="row" spacing={1} alignItems="center" sx={{ mt: .5 }}><Typography variant="caption">{task.createdAt}</Typography><Chip size="small" label={priorityLabel[task.priority]} color={priorityColor[task.priority]} /></Stack>} /></ListItem>{!last && <Divider component="li" />}</>;
}

export default App;
