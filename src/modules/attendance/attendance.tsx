import { useState } from "react";
import Swal from "sweetalert2";

function Attendance() {
  const [formData, setFormData] = useState({
    entryDate: "",
    entryTime: "",
    exitTime: "",
    activities: "",
    incidents: "",
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { entryDate, entryTime, exitTime, activities } = formData;

    if (!entryDate || !entryTime || !exitTime || !activities) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos obligatorios.",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Reporte enviado",
      text: "El reporte ha sido enviado con éxito.",
      confirmButtonText: "OK",
    }).then(() => {
      setFormData({
        entryDate: "",
        entryTime: "",
        exitTime: "",
        activities: "",
        incidents: "",
      });
    });
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Asistencia</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Registro de atenciones e incidentes
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="mb-4">
            <h2 className="mb-3">Registro de Ingreso y Actividades</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="entryDate">Fecha de Ingreso</label>
                <input
                  type="date"
                  className="form-control mb-3"
                  id="entryDate"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="entryTime">Hora de Ingreso</label>
                <input
                  type="time"
                  className="form-control mb-3"
                  id="entryTime"
                  value={formData.entryTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exitTime">Hora de Salida</label>
                <input
                  type="time"
                  className="form-control mb-3"
                  id="exitTime"
                  value={formData.exitTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="activities">Registro de Actividades</label>
                <textarea
                  className="form-control mb-3"
                  id="activities"
                  placeholder="Ingrese detalles de las actividades"
                  value={formData.activities}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="incidents">Registro de Incidentes</label>
                <textarea
                  className="form-control mb-3"
                  id="incidents"
                  placeholder="Ingrese detalles de los incidentes (opcional)"
                  value={formData.incidents}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar Reporte
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
