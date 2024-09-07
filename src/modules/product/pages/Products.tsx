import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { Product } from "../../../types/Product";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../../services/Product";
import "./Products.css";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  //---------------------------------------------------------------- GET PRODUCTS
  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (currentProduct && currentProduct.UrlImage) {
      setImagePreview(currentProduct.UrlImage);
    }
  }, [currentProduct]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      Swal.fire("Error", "No se pudo cargar los productos", "error");
    }
  };

  //---------------------------------------------------------------- DELETE PRODUCT
  const handleDelete = async (productId: any) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        if (productId) {
          const response = await deleteProduct(productId);
          if (response.success) {
            Swal.fire("¡Producto eliminado!", response.msg, "success");
            loadProducts();
          } else {
            Swal.fire("Error", response.msg, "error");
          }
        }
      }
    } catch (error) {
      Swal.fire("Error", "Oppss, algo salio mal!", "error");
    }
  };

  const handleCloseModal = () => setShowEditModal(false);

  //---------------------------------------------------------------- UPDATE PRODUCT
  const handleSaveChanges = async () => {
    if (!currentProduct) return;

    try {
      const formData = new FormData();
      formData.append("IdProduct", currentProduct.IdProduct);
      formData.append("Name", currentProduct.Name);
      formData.append("Description", currentProduct.Description);
      formData.append(
        "NutritionalInformation",
        currentProduct.NutritionalInformation
      );
      formData.append("Price", currentProduct.Price.toString());
      formData.append("Stock", currentProduct.Stock.toString());
      formData.append("Category", currentProduct.Category.toString());

      let imageFile;
      if (file) {
        imageFile = file;
      } else if (currentProduct.UrlImage) {
        const response = await fetch(currentProduct.UrlImage);
        const blob = await response.blob();
        const fileName = currentProduct.UrlImage.split("/").pop();
        imageFile = new File([blob], fileName, { type: blob.type });
      }

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await updateProduct(formData);
      if (response.success) {
        Swal.fire("Éxito", response.msg, "success");
        loadProducts();
        handleCloseModal();
      } else {
        Swal.fire("Error", response.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Oppss, algo salió mal!", "error");
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFile(null);
    setImagePreview(product.UrlImage);
    setShowEditModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImagePreview(imageUrl);
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
            Lista de centros ESSALUD
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar centro de Salud..."
        />
      </div>

      <div className="table-responsive">
        <table
          id="example"
          className="table table-striped table-bordered"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Centro de Salud</th>
              <th>Código</th>
              <th>Número de Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>12345678</td>
              <td>997892687</td>
              <td>123@gmail.com</td>
              <td>Patibamba Baja</td>
              <td>Abancay</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">
                  Editar
                </button>
                <button className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
