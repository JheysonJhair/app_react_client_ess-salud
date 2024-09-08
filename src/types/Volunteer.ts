export interface Volunteer {
  IdUser?: number;
  nombresCompletos: string;
  dni: string;
  direccion: string;
  email: string;
  cumpleanos: string;
  password: string;
  rol: string;
  departamento: number;
  idCentroSalud?: number;
}

export interface ErrorMessages {
  IdUser?: number;
  nombresCompletos: string;
  dni: string;
  direccion: string;
  email: string;
  cumpleanos: string;
  password: string;
  rol: string;
  departamento: number;
  idCentroSalud?: number;
}

export interface ApiResponse {
  msg: string;
  success: boolean;
  data?: Volunteer[];
}
