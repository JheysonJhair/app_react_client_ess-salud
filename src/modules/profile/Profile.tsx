import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


export interface HealthCenter {
  idCentroSalud: number;
  nombreSalud: string;
  telefono: string;
  direccion: string;
  codigo: string;
  email: string;
  departamento: string;
}

export interface User {
  idUsuario: number;
  nombresCompletos: string;
  dni: string;
  direccion: string;
  email: string;
  cumpleanos: string;
  password: string;
  rol: number;
  departamento: string;
  CentroSalud: HealthCenter;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchUserData = async (id: number) => {
    try {
      const response = await axios.get(
        `https://project-essalud-production.up.railway.app/api/usuario/getBydId/${id}`
      );
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        Swal.fire({
          title: "Error!",
          text: "No se pudieron obtener los datos del usuario.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al obtener los datos del usuario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIdUsuario(parsedUser.idUsuario);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Ocurrió un error al leer el usuario del localStorage.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se encontró el ID del usuario en localStorage.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (idUsuario) {
      fetchUserData(idUsuario);
    }
  }, [idUsuario]);

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Voluntario</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Perfil de Usuario
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-8 col-xl-6">
          <div className="card shadow-sm">
            <div className="card-body">
              {loading ? (
                <p className="text-center text-muted">Cargando datos...</p>
              ) : user ? (
                <div className="text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                    alt="Avatar de Usuario"
                    className="rounded-circle mb-3"
                    width="50"
                    height="50"
                  />
                  <h5 className="mb-2">{user.nombresCompletos}</h5>
                  <p className="text-muted mb-4">{user.email}</p>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="mb-2">DNI</h6>
                          <p>{user.dni}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="mb-2">Fecha de Nacimiento</h6>
                          <p>{new Date(user.cumpleanos).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="mb-2">Dirección</h6>
                          <p>{user.direccion}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="mb-2">Departamento</h6>
                          <p>{user.departamento}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="mb-2">Rol</h6>
                          <p>{user.rol === 1 ? "Administrador" : "Usuario"}</p>
                        </div>
                      </div>
                    </div>
                    {user.CentroSalud && (
                      <div className="col-md-6">
                        <div className="card mb-3">
                          <div className="card-body">
                            <h6 className="mb-2">Centro de Salud</h6>
                            <p>{user.CentroSalud.nombreSalud}</p>
                            <p>{user.CentroSalud.direccion}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <p className="text-center text-muted">No se encontraron datos.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
