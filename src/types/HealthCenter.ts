export interface HealthCenter {
  idCentroSalud?: number;
  nombreSalud: string;
  telefono: string;
  direccion: string;
  codigo: string;
  email: string;
  departamento: string;
}

export interface ErrorMessages {
  idCentroSalud?: number;
  nombreSalud: string;
  telefono: string;
  direccion: string;
  codigo: string;
  email: string;
  departamento: string;
}

export interface ApiResponse {
    msg: string;
    success: boolean;
    data?: HealthCenter[];
  }
  