import React, { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

function TradinUser() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const date = formData.get("activityDate") as string;
    const type = formData.get("activityType") as string;
    const comment = formData.get("activityComment") as string;

    if (!date || !type || !comment) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Todos los campos son requeridos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    Swal.fire({
      title: "Éxito",
      text: "Actividad enviada correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    handleClose();
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Capacitación</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Lista de Actividades Centros de Salud
          </li>
        </ol>
      </nav>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="table-container">
            <h4 className="mb-4">Enlaces de Zoom</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Día de Zoom</th>
                  <th>Hora</th>
                  <th>Enlace de Zoom</th>
                  <th>Descripción de Zoom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10/09/2024</td>
                  <td>08:00 am</td>
                  <td>
                    <a
                      href="https://us06web.zoom"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://us06web.zoom
                    </a>
                  </td>
                  <td>Atención al cliente</td>
                </tr>
                <tr>
                  <td>10/09/2024</td>
                  <td>07:00 pm</td>
                  <td>
                    <a
                      href="https://us06web.zoom"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://us06web.zoom
                    </a>
                  </td>
                  <td>Atención al cliente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="table-container">
            <h4 className="mb-4">Enlaces de Video</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Enlace de Video</th>
                  <th>Descripción de Video</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://link-youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://link-youtube
                    </a>
                  </td>
                  <td>Empatía y buen trato</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6">
          <div className="table-container">
            <h4 className="mb-4">Enlaces de Curso</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Enlace de Curso</th>
                  <th>Descripción de Curso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://link-curso"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link Curso
                    </a>
                  </td>
                  <td>Curso para mejora de carisma</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <br />

      <Button variant="primary" onClick={handleShow}>
        Registrar Actividad Participada
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar Actividad Participada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="activityDate">Fecha</label>
              <input
                type="date"
                className="form-control mb-3"
                id="activityDate"
                name="activityDate"

              />
            </div>
            <div className="form-group">
              <label htmlFor="activityType">Tipo de Actividad</label>
              <select
                className="form-control mb-3"
                id="activityType"
                name="activityType"

              >
                <option value="">-- Seleccione una opción --</option>
                <option value="zoom">Zoom</option>
                <option value="video">Video</option>
                <option value="course">Curso</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="activityComment">Comentario</label>
              <textarea
                className="form-control mb-3"
                id="activityComment"
                name="activityComment"
                placeholder="Ingrese detalles de lo que vio"

              ></textarea>
            </div>
            <Button type="submit" variant="primary">
              Enviar Actividad
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TradinUser;
