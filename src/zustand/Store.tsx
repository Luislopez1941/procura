import { create } from 'zustand';
import userService from '../services/api/userService';
import Swal from 'sweetalert2';

interface Companies {
  id: number;
  nombre_comercial: string;
  razon_social: string;
}

interface BranchOffices {
  id: number;
  nombre: string;
  direccion: string;
  contacto: string;
}

interface Areas {
  id: number;
  nombre: string;
}

interface StoreState {
  companies: Companies[];
  branchOffices: BranchOffices[];
  areas: Areas[];
  series: Series[]; // Añade esta línea si `series` debería estar en `StoreState`
}

export const useStore = create<StoreState>((set, get) => ({
  companies: [],
  branchOffices: [],
  areas: [],
  series: [], // Añade esta línea si `series` debería estar en el estado

  getCompanies: async (customPath?: string) => {
    try {
      const response = await userService.getCompanies(customPath);
      set({ companies: response as Companies[] }); // Asegúrate de convertir el tipo
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  },

  createCompanies: async (razon_social: string, nombre_comercial: string, customPath?: string) => {
    try {
      const response = await userService.createCompanies(razon_social, nombre_comercial, customPath);
      Swal.fire('Empresa creada exitosamente', '', 'success');
      console.log('Empresa creada:', response);
      await get().getCompanies();
    } catch (error) {
      console.error('Error creating company:', error);
      Swal.fire('Error', 'Hubo un error al crear la empresa', 'error');
    }
  },

  getBranchOffices: async (customPath?: string) => {
    try {
      const response = await userService.getBranchOffices(customPath);
      set({ branchOffices: response as BranchOffices[] }); // Asegúrate de convertir el tipo
    } catch (error) {
      console.error('Error fetching branch office:', error);
    }
  },

  createBranchOffices: async (nombre: string, direccion: string, contacto: string, empresa_id: number) => {
    try {
      const response = await userService.createBrachOffices(nombre, direccion, contacto, empresa_id);
      Swal.fire('Sucursal creada exitosamente', '', 'success');
      console.log('Sucursal creada', response)
      await get().getBranchOffices();
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear la sucursal', 'error');
      console.error('Error creating sucursal:', error);
    }
  },

  getAreas: async (customPath?: string) => {
    try {
      const response = await userService.getAreas(customPath);
      set({ areas: response as Areas[] }); // Asegúrate de convertir el tipo
    } catch (error) {
      console.error('Error fetching Areas', error);
    }
  },

  createAreas: async (sucursal_id: number, nombre: string) => {
    try {
      const response = await userService.createAreas(sucursal_id, nombre);
      Swal.fire('Area creada exitosamente', '', 'success');
      console.log('Area creada', response)
      await get().getAreas();
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear la area', 'error');
      console.error('Error creating Areas', error);
    }
  },

  getSeries: async (customPath?: string) => {
    try {
      const response = await userService.getSeries(customPath);
      set({ series: response as Series[] }); // Asegúrate de convertir el tipo
    } catch (error) {
      console.error('Error fetching Series', error);
    }
  },

  createSeries: async (sucursal_id: number, nombre: string) => {
    try {
      const response = await userService.createSeries(sucursal_id, nombre);
      Swal.fire('Serie creada exitosamente', '', 'success');
      console.log('Serie creada', response)
      await get().getSeries();
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al crear la serie', 'error');
      console.error('Error en crear la serie', error);
    }
  }
}));
