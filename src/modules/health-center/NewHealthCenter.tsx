import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { HealthCenter } from "../../types/HealthCenter";
import { validateEmail, validateRequiredField } from "../../utils/validations";
import { crearCentro } from "../../services/HealthCenter";

export function NewHealthCenter() {
  const navigate = useNavigate();

  const [nuevoCentro, setNuevoCentro] = useState<Partial<HealthCenter>>({});

  const [errorMessages, setErrorMessages] = useState({
    nombreSalud: "",
    telefono: "",
    direccion: "",
    codigo: "",
    email: "",
    departamento: "",
  });

  //---------------------------------------------------------------- INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNuevoCentro((prevCentro) => ({
      ...prevCentro,
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
      case "email":
        return validateEmail(value) || validateRequiredField(value) || null;
      default:
        return validateRequiredField(value);
    }
  };

  //---------------------------------------------------------------- POST HEALTH CENTER
  type UsuarioKey = keyof Partial<HealthCenter>;
  const handleRegistrarCentro = async () => {
    try {
      const requiredFields: UsuarioKey[] = [
        "nombreSalud",
        "telefono",
        "direccion",
        "email",
        "codigo",
        "departamento",
      ];

      const missingFields = requiredFields.filter(
        (field) => !nuevoCentro[field]
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
      console.log(nuevoCentro);
      response = await crearCentro(nuevoCentro);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/health-centers/");
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
      console.error("Error al registrar el nuevo centro:", error);
    }
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Centro de saliud</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Crear nuevo centro
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Registrar centro</h6>
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Nombre del centro de salud
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombreSalud"
                        placeholder="Ingrese sus nombres y apellidos"
                        onChange={handleInputChange}
                      />
                      {errorMessages.nombreSalud && (
                        <div className="text-danger">
                          {errorMessages.nombreSalud}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Código</label>
                      <input
                        type="text"
                        className="form-control"
                        name="codigo"
                        placeholder="Ingrese el codigo"
                        onChange={handleInputChange}
                      />
                      {errorMessages.codigo && (
                        <div className="text-danger">
                          {errorMessages.codigo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Número de telefono</label>
                      <input
                        type="text"
                        className="form-control"
                        name="telefono"
                        placeholder="Ingrese su telefono"
                        onChange={handleInputChange}
                      />
                      {errorMessages.telefono && (
                        <div className="text-danger">
                          {errorMessages.telefono}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Dirección</label>
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
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label">Departamento</label>
                      <input
                        type="text"
                        className="form-control"
                        name="departamento"
                        placeholder="Ingrese el departamento"
                      />
                      {errorMessages.departamento && (
                        <div className="text-danger">
                          {errorMessages.departamento}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <button
                type="button"
                className="btn btn-primary submit"
                onClick={handleRegistrarCentro}
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
