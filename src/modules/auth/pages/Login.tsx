import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../../../services/Login";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //---------------------------------------------------------------- VERIFYCATE
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  //---------------------------------------------------------------- POST LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({
        email: username,
        password: password,
      });
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", "true");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Bienvenido ${response.data.nombresCompletos}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
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
                        ESSALUD{" "}
                        <span> Sistema web de gestión de Voluntarios </span>
                      </a>
                      <h5 className="text-muted fw-normal mb-4">
                        ¡Bienvenido de nuevo! Ingrese a su cuenta.
                      </h5>
                      <form className="forms-sample" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="userEmail" className="form-label">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="userPassword" className="form-label">
                            Contraseña
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="userPassword"
                            autoComplete="current-password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Ocultar" : "Mostrar"} contraseña
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn me-2 mb-2 mb-md-0"
                            style={{
                              backgroundColor: "#e83184",
                              width: "150px",
                              color: "#ffffff",
                            }}
                          >
                            Ingresar
                          </button>
                          <NavLink
                            to={"/register"}
                            className="btn me-2 mb-2 mb-md-0"
                            style={{
                              border: "1px solid #e83184",
                              width: "150px",
                              color: "#e83184",
                            }}
                          >
                            Registrarse
                          </NavLink>
                        </div>
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
