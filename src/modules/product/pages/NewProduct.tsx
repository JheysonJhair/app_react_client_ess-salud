import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";
import { addProduct } from "../../../services/Product";
import { form } from "../../../types/Product";

const acceptTypes = {
  "image/*": [],
};

const NewProduct: React.FC = () => {
  const [formData, setFormData] = useState<form>({
    name: "",
    description: "",
    nutritionalInfo: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof form, string>>>({
    name: "",
    description: "",
    nutritionalInfo: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleDrop = (acceptedFiles: File[]) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
    setErrors({ ...errors, image: "" });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: acceptTypes,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  //-------------------------------------------- VALIDATE FORM
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof form, string>> = {};
    let isValid = true;

    for (const key in formData) {
      if (
        formData[key as keyof form] === "" ||
        formData[key as keyof form] === null
      ) {
        newErrors[key as keyof form] = "Este campo es obligatorio";
        isValid = false;
      }
    }

    if (formData.image === null) {
      newErrors.image = "Selecciona una imagen";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  //---------------------------------------------------------------- POST PRODUCT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();
    data.append("Name", formData.name);
    data.append("Description", formData.description);
    data.append("NutritionalInformation", formData.nutritionalInfo);
    data.append("Category", formData.category);
    data.append("Price", formData.price);
    data.append("Stock", formData.stock);
    if (formData.image) {
      data.append("file", formData.image);
    }

    try {
      const response = await addProduct(data);
      if (response.success) {
        Swal.fire({
          title: "Éxito",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setFormData({
          name: "",
          description: "",
          nutritionalInfo: "",
          category: "",
          price: "",
          stock: "",
          image: null,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Opps, algo salio mal",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">ESSALUD</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Nuevo ESSALUD
          </li>
        </ol>
      </nav>

      <div className="row">
          <div className="col-md-12 stretch-card">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Reguistrar centro de salud</h2>
                  <form id="signupForm" onSubmit={handleSubmit}>
                        
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Nombre de centro de salud</label>
                          <input
                            type="text"
                            className="form-control"
                            name="HealthCenter"
                            placeholder="Ingrese el nombre del centro de salud"
                          />
                          <div className="text-danger"></div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Código</label>
                          <input
                            type="text"
                            className="form-control"
                            name="Department"
                            placeholder="Ingrese su departamento"
                          />
                          <div className="text-danger"></div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label className="form-label">Número de Teléfono</label>
                        <input
                          type="text"
                          className="form-control"
                          name="PhoneNumber"
                          placeholder="Ingrese su número de teléfono"
                        />
                        <div className="text-danger"></div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="Email"
                          placeholder="Ingrese su correo electrónico"
                        />
                        <div className="text-danger"></div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Address"
                          placeholder="Ingrese su dirección"
                        />
                        <div className="text-danger"></div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="mb-3">
                        <label className="form-label">Departamento</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Department"
                          placeholder="Ingrese su departamento"
                        />
                        <div className="text-danger"></div>
                      </div>
                    </div>
                  </div>
                </form>
                <button
                        type="button"
                        className="btn btn-primary submit"
                      >
                        Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>




  );
};

export default NewProduct;
