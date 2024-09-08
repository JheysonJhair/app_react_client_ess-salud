export interface User {
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
