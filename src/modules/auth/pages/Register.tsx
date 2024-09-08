import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validations";
import { User } from "../../../types/User";
import { crearUsuario } from "../../../services/Usuario";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<User>>({});

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

    setFormData((prevData) => ({
      ...prevData,
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
  type UserKey = keyof Partial<User>;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const requiredFields: UserKey[] = [
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

      const missingFields = requiredFields.filter((field) => !formData[field]);
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
      response = await crearUsuario(formData);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: "El usuario se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/login/");
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
        text: "Opps, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar el nuevo usuario:", error);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="page-wrapper full-page">
        <div className="page-content d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-0 auth-page">
            <div className="col-md-8 col-xl-6 mx-auto">
              <div className="card">
                <div className="row">
                  <div className="col-md-4 pe-md-0 d-flex align-items-center justify-content-center">
                    <div
                      className="auth-side-wrapper w-100 h-100"
                      style={{
                        backgroundImage:
                          "url(../../../../assets/img/login_bg.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100vh",
                      }}
                    />
                  </div>
                  <div className="col-md-8 ps-md-0">
                    <div className="auth-form-wrapper px-4 py-5">
                      <a href="#" className="noble-ui-logo d-block mb-2">
                        Yogurt <span>MAFER</span>
                      </a>
                      <h5 className="text-muted fw-normal mb-4">
                        Crea una cuenta nueva.
                      </h5>
                      <form className="forms-sample" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <label
                              htmlFor="nombresCompletos"
                              className="form-label"
                            >
                              Nombre
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="nombresCompletos"
                              name="nombresCompletos"
                              value={formData.nombresCompletos || ""}
                              onChange={handleInputChange}
                              placeholder="Nombres y apellidos"
                            />
                            {errorMessages.nombresCompletos && (
                              <div className="text-danger">
                                {errorMessages.nombresCompletos}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="dni" className="form-label">
                              DNI
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="dni"
                              name="dni"
                              value={formData.dni || ""}
                              onChange={handleInputChange}
                              placeholder="DNI"
                            />
                            {errorMessages.dni && (
                              <div className="text-danger">
                                {errorMessages.dni}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="direccion" className="form-label">
                              Dirección
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="direccion"
                              name="direccion"
                              value={formData.direccion || ""}
                              onChange={handleInputChange}
                              placeholder="Dirección"
                            />
                            {errorMessages.direccion && (
                              <div className="text-danger">
                                {errorMessages.direccion}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="email" className="form-label">
                              Correo electrónico
                            </label>
                            <input
                              type="eemail"
                              className="form-control form-control-lg"
                              id="email"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              placeholder="Correo electrónico"
                            />
                            {errorMessages.email && (
                              <div className="text-danger">
                                {errorMessages.email}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="password" className="form-label">
                              Contraseña
                            </label>
                            <input
                              type="password"
                              className="form-control form-control-lg"
                              id="password"
                              name="password"
                              value={formData.password || ""}
                              onChange={handleInputChange}
                              placeholder="Contraseña"
                            />
                            {errorMessages.password && (
                              <div className="text-danger">
                                {errorMessages.password}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cumpleanos" className="form-label">
                              Fecha de nacimiento
                            </label>
                            <input
                              type="date"
                              className="form-control form-control-lg"
                              id="cumpleanos"
                              name="cumpleanos"
                              value={formData.cumpleanos || ""}
                              onChange={handleInputChange}
                            />
                            {errorMessages.cumpleanos && (
                              <div className="text-danger">
                                {errorMessages.cumpleanos}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-primary me-2 mb-2 mb-md-0"
                          >
                            Ingresar
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
                          >
                            <i
                              className="btn-icon-prepend"
                              data-feather="twitter"
                            />
                            Iniciar con Google
                          </button>
                        </div>
                        <NavLink
                          to="/login"
                          className="d-block mt-3 text-muted"
                        >
                          ¿Ya tienes cuenta? Iniciar sesión
                        </NavLink>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
