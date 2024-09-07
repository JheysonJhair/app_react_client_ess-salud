import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { fetchSales } from "../../../services/Payment";
import { SalePayment } from "../../../types/Payment";
import "../styles.css";

const Payment: React.FC = () => {
  const [izipayPayments, setIzipayPayments] = useState<SalePayment[]>([]);
  const [yapePayments, setYapePayments] = useState<SalePayment[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  //---------------------------------------------------------------- GET SALES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await fetchSales();
        const izipay = sales.filter((sale) => sale.PaymentMethod);
        const yape = sales.filter((sale) => !sale.PaymentMethod);
        console.log(izipayPayments);
        setIzipayPayments(izipay);
        setYapePayments(yape);
      } catch (error) {
        Swal.fire("Error", "Opps, algo salio mal", "error");
      }
    };

    fetchData();
  }, []);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Reporte</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Voluntario - Administrador
          </li>
        </ol>
      </nav>
      <div className="container mt-4">
        <div className="payment-container">
          <div className="table-container">
            <h4 className="mb-4">Registro de Actividades Voluntariado</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Voluntario</th>
                  <th>Fecha</th>
                  <th>Turno</th>
                  <th>Hora Ingreso</th>
                  <th>Hora Salida</th>
                  <th>Email</th>
                  <th>Actividades</th>
                  <th>Insidentes</th>
                  <th>Comentario supervisor</th>
                </tr>
              </thead>
              <tbody>
                {izipayPayments.map((payment) => (
                  <tr key={payment.IdSales}>
                    <td>
                      {payment.Client.FirstName + " " + payment.Client.LastName}
                    </td>
                    <td>{payment.SaleDate}</td>
                    <td>Mañana/Tarde</td>
                    <td>08:00 || 12:00</td>
                    <td>12:00 || 16:00</td>
                    <td>1233@hotmail.com</td>
                    <td>Actividades en el día</td>
                    <td>Descripción de Insidentes</td>
                    <td>Descripcion de supervision</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-container mt-4">
            <h4 className="mb-4">Registro de actividades administrador</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Cargo</th>
                  <th>Centro de Salud</th>
                  <th>Tipo actividad</th>
                  <th>Comentario activiad</th>
                </tr>
              </thead>
              <tbody>
                {yapePayments.map((payment) => (
                  <tr key={payment.IdSales}>
                     <td>Identifiación Personal</td>
                     <td>Día de Registro</td>
                     <td>Super admin || admin</td>
                     <td>Nombre del centro</td>
                     <td>link|Capacitacion|curso|Evaluacion</td>
                     <td>Comentario de actividad</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modalImage && (
        <div className="modal-overlay2" onClick={closeModal}>
          <div className="modal-content2">
            <img src={modalImage} alt="Comprobante" className="modal-image2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
