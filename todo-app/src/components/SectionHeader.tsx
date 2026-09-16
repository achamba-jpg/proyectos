import { Box, Typography } from '@mui/material';
export default function SectionHeader({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text: string; centered?: boolean }) {
  return <Box sx={{ maxWidth: 760, mb: 5, mx: centered ? 'auto' : 0, textAlign: centered ? 'center' : 'left' }}><Typography color="secondary" fontWeight={800} sx={{ letterSpacing: 2, textTransform: 'uppercase', fontSize: 13 }}>{eyebrow}</Typography><Typography variant="h2" sx={{ mt: 1 }}>{title}</Typography><Typography color="text.secondary" fontSize="1.1rem">{text}</Typography></Box>;
}
