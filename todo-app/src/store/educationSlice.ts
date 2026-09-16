import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { Curiosidad, Evolucion, Herramienta, HomoSapiens } from '../types';

interface EducationState { humanos: HomoSapiens[]; evolucion: Evolucion[]; herramientas: Herramienta[]; curiosidades: Curiosidad[]; status: 'idle'|'loading'|'succeeded'|'failed'; error: string | null; }
const initialState: EducationState = { humanos: [], evolucion: [], herramientas: [], curiosidades: [], status: 'idle', error: null };
export const loadEducation = createAsyncThunk('education/load', async () => Promise.all([api.humanos(), api.evolucion(), api.herramientas(), api.curiosidades()]));
const educationSlice = createSlice({ name: 'education', initialState, reducers: {}, extraReducers: (builder) => { builder.addCase(loadEducation.pending, (state) => { state.status = 'loading'; state.error = null; }).addCase(loadEducation.fulfilled, (state, action) => { [state.humanos, state.evolucion, state.herramientas, state.curiosidades] = action.payload; state.status = 'succeeded'; }).addCase(loadEducation.rejected, (state) => { state.status = 'failed'; state.error = 'No se pudo cargar la información educativa.'; }); } });
export default educationSlice.reducer;
