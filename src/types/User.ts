import { HealthCenter } from "./HealthCenter";

export interface User {
  idUsuario?: number;
  nombresCompletos: string;
  dni: string;
  direccion: string;
  email: string;
  cumpleanos: string;
  password: string;
  rol: number;
  departamento: string;
  idCentroSalud?: number;
  CentroSalud?:HealthCenter
}

export interface ErrorMessages {
  idUsuario?: number;
  nombresCompletos: string;
  dni: string;
  direccion: string;
  email: string;
  cumpleanos: string;
  password: string;
  rol: number;
  departamento: string;
  idCentroSalud?: number;
  CentroSalud?:HealthCenter
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface ApiResponse {
  msg: string;
  success: boolean;
  data?: User[];
}
