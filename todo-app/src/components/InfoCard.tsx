import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { ReactNode } from 'react';
export default function InfoCard({ image, icon, label, title, text, children }: { image?: string; icon?: ReactNode; label?: string; title: string; text: string; children?: ReactNode }) {
  return <Card sx={{ height: '100%' }}>{image && <Box component="img" src={image} alt={title} sx={{ width: '100%', height: 210, objectFit: 'cover' }} />}<CardContent>{icon && <Typography variant="h2" sx={{ mb: 1 }}>{icon}</Typography>}{label && <Chip label={label} size="small" color="secondary" />}{<Typography variant="h5" sx={{ mt: label ? 1.5 : 0, mb: 1 }}>{title}</Typography>}<Typography color="text.secondary">{text}</Typography>{children}</CardContent></Card>;
}
