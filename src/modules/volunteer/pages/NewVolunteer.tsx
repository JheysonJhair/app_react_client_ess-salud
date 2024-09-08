import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validations";
import { crearUsuario } from "../../../services/Usuario";
import { Volunteer } from "../../../types/Volunteer";

export function NewVolunteer() {
  const navigate = useNavigate();
  const [nuevoUsuario, setNuevoVoluntario] = useState<Partial<Volunteer>>({
    rol: "",
  });

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

  //---------------------------------------------------------------- INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevoVoluntario((prevUsuario) => ({
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
  type UsuarioKey = keyof Partial<Volunteer>;
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
        navigate("/clients/");
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
            <a href="#">Voluntario</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Crear nuevo voluntario
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Registrar voluntario</h6>
              <form>
                <div className="row">
                  <div className="col-sm-8">
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
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Centro de Salud</label>
                      <input
                        type="text"
                        className="form-control"
                        name="idCentroSalud"
                        placeholder="Ingrese el nombre del centro de salud"
                        onChange={handleInputChange}
                      />
                      {errorMessages.idCentroSalud && (
                        <div className="text-danger">
                          {errorMessages.idCentroSalud}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Departamento</label>
                      <input
                        type="text"
                        className="form-control"
                        name="departamento"
                        placeholder="Ingrese su departamento"
                        onChange={handleInputChange}
                      />
                      {errorMessages.departamento && (
                        <div className="text-danger">
                          {errorMessages.departamento}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="mb-3">
                      <label className="form-label">Rol</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Role"
                        placeholder="Ingrese su rol"
                      />
                      <div className="text-danger"></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Cumpleaños *</label>
                      <input
                        type="date"
                        className="form-control"
                        name="BirthDate"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
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
