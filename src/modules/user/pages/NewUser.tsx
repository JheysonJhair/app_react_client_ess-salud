import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validations";
import { User } from "../../../types/User";
import { crearUsuario } from "../../../services/Usuario";
import { obtenerCentros } from "../../../services/HealthCenter";
import { HealthCenter } from "../../../types/HealthCenter";

export function NewUser() {
  const navigate = useNavigate();
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<User>>({});
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [errorMessages, setErrorMessages] = useState({
    nombresCompletos: "",
    dni: "",
    direccion: "",
    email: "",
    cumpleanos: "",
    password: "",
    rol: "",
    departamento: "",
    idCentroSalud: "",
  });

  //---------------------------------------------------------------- GET HEALTH CENTERS
  useEffect(() => {
    const fetchHealthCenters = async () => {
      const centros = await obtenerCentros();
      setHealthCenters(centros);
    };

    fetchHealthCenters();
  }, []);

  //---------------------------------------------------------------- INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  //---------------------------------------- VALIDATION
  const validateField = (
    name: string,
    value: string | undefined
  ): string | null => {
    switch (name) {
      case "Dni":
        return validateDNI(value) || validateRequiredField(value) || null;
      case "Mail":
        return validateEmail(value) || validateRequiredField(value) || null;
      case "Phone":
        return (
          validatePhoneNumber(value) || validateRequiredField(value) || null
        );
      default:
        return validateRequiredField(value);
    }
  };

  //---------------------------------------------------------------- POST USER
  type UsuarioKey = keyof Partial<User>;
  const handleRegistrarUsuario = async () => {
    try {
      const requiredFields: UsuarioKey[] = [
        "nombresCompletos",
        "dni",
        "direccion",
        "email",
        "cumpleanos",
        "password",
        "rol",
        "departamento",
        "idCentroSalud",
      ];

      const missingFields = requiredFields.filter(
        (field) => !nuevoUsuario[field]
      );
      if (missingFields.length > 0) {
        Swal.fire({
          title: "Error!",
          text: "Por favor complete los siguientes campos obligatorios:",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      let response: { msg: string; success: boolean };
      console.log(nuevoUsuario);
      response = await crearUsuario(nuevoUsuario);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: "El usuario se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/users/");
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg,
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar el nuevo usuario:", error);
    }
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Usuarios</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Crear nuevo usuario
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Registrar Usuario</h6>
              <form>
                <div className="row">
                  <div className="col-sm-5">
                    <div className="mb-3">
                      <label className="form-label">Nombres y apellidos</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombresCompletos"
                        placeholder="Ingrese sus nombres y apellidos"
                        onChange={handleInputChange}
                      />
                      {errorMessages.nombresCompletos && (
                        <div className="text-danger">
                          {errorMessages.nombresCompletos}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Dni</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dni"
                        placeholder="Ingrese su dni"
                        onChange={handleInputChange}
                      />
                      {errorMessages.dni && (
                        <div className="text-danger">{errorMessages.dni}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="mb-3">
                      <label className="form-label">Rol</label>
                      <select
                        className="form-control"
                        name="rol"
                        onChange={handleInputChange}
                        value={nuevoUsuario.rol || ""}
                      >
                        <option value="">Seleccione un rol</option>
                        <option value="1">Administrador</option>
                        <option value="2">Super Administrador</option>
                      </select>
                      {errorMessages.rol && (
                        <div className="text-danger">{errorMessages.rol}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Direccion</label>
                      <input
                        type="text"
                        className="form-control"
                        name="direccion"
                        placeholder="Ingrese su direccion"
                        onChange={handleInputChange}
                      />
                      {errorMessages.direccion && (
                        <div className="text-danger">
                          {errorMessages.direccion}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Centro de Salud</label>
                      <select
                        className="form-control"
                        name="idCentroSalud"
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccione un centro de salud</option>
                        {healthCenters.map((centro) => (
                          <option
                            key={centro.idCentroSalud}
                            value={centro.idCentroSalud}
                          >
                            {centro.nombreSalud}
                          </option>
                        ))}
                      </select>
                      {errorMessages.idCentroSalud && (
                        <div className="text-danger">
                          {errorMessages.idCentroSalud}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Ingrese su email"
                        onChange={handleInputChange}
                      />
                      {errorMessages.email && (
                        <div className="text-danger">{errorMessages.email}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Departamento</label>
                      <select
                        className="form-control"
                        name="departamento"
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccione un departamento</option>
                        <option value="Lima">Lima</option>
                        <option value="Cusco">Cusco</option>
                        <option value="Arequipa">Arequipa</option>
                      </select>
                      {errorMessages.departamento && (
                        <div className="text-danger">
                          {errorMessages.departamento}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Cumpleaños *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="cumpleanos"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        autoComplete="off"
                        placeholder="Contraseña"
                        onChange={handleInputChange}
                      />
                      {errorMessages.password && (
                        <div className="text-danger">
                          {errorMessages.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row"></div>
                </div>
              </form>
              <button
                type="button"
                className="btn btn-primary submit"
                onClick={handleRegistrarUsuario}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
