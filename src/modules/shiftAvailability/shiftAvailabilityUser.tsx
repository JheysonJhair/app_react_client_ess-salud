import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function AvailabilityUser() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [horarios, setHorarios] = useState([
    {
      periodo: "08:00 - 12:00",
      dias: {
        Lunes: "Reservado",
        Martes: "Disponible",
        Miércoles: "Disponible",
        Jueves: "Disponible",
        Viernes: "Disponible",
        Sábado: "Reservado",
      },
    },
    {
      periodo: "12:00 - 16:00",
      dias: {
        Lunes: "Disponible",
        Martes: "Disponible",
        Miércoles: "Disponible",
        Jueves: "Disponible",
        Viernes: "Reservado",
        Sábado: "Disponible",
      },
    },
  ]);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDay("");
    setSelectedPeriod("");
  };

  const handleSave = () => {
    if (selectedDay && selectedPeriod) {
      const selectedHorario = horarios.find(
        (horario) =>
          horario.periodo ===
          (selectedPeriod === "Mañana" ? "08:00 - 12:00" : "12:00 - 16:00")
      );

      if (selectedHorario) {
        if (
          selectedHorario.dias[
            selectedDay as keyof typeof selectedHorario.dias
          ] === "Reservado"
        ) {
          Swal.fire({
            title: "Horario ya reservado",
            text: `El horario del ${selectedDay} en el periodo ${selectedPeriod} ya está reservado.`,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          setHorarios((prevHorarios) =>
            prevHorarios.map((horario) =>
              horario.periodo ===
              (selectedPeriod === "Mañana" ? "08:00 - 12:00" : "12:00 - 16:00")
                ? {
                    ...horario,
                    dias: {
                      ...horario.dias,
                      [selectedDay as keyof typeof horario.dias]: "Reservado",
                    },
                  }
                : horario
            )
          );

          Swal.fire({
            title: "Éxito",
            text: "Horario reservado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          setShowModal(false);
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró el periodo seleccionado.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      Swal.fire({
        title: "Campos incompletos",
        text: "Complete los 2 campos por favor!",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };
  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Turno y disponibilidad</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Verficar turno
          </li>
        </ol>
      </nav>

      <div className="row mt-4">
        <div className="col-md-12">
          <h5>Horarios seleccionados:</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Hora / Día</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sábado</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario, index) => (
                <tr key={index}>
                  <td>{horario.periodo}</td>
                  <td>{horario.dias.Lunes}</td>
                  <td>{horario.dias.Martes}</td>
                  <td>{horario.dias.Miércoles}</td>
                  <td>{horario.dias.Jueves}</td>
                  <td>{horario.dias.Viernes}</td>
                  <td>{horario.dias.Sábado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-between">
          <Button variant="secondary" onClick={handleOpenModal}>
            Elegir horario vacío
          </Button>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        style={{ marginTop: "50px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Elegir horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDay">
              <Form.Label>Selecciona el día:</Form.Label>
              <Form.Control
                as="select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="">-- Selecciona un día --</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPeriod" className="mt-3">
              <Form.Label>Selecciona el periodo:</Form.Label>
              <div className="mb-3">
                <Form.Check
                  type="radio"
                  id="morning"
                  name="period"
                  label="Mañana (08:00 - 12:00)"
                  value="Mañana"
                  checked={selectedPeriod === "Mañana"}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  id="afternoon"
                  name="period"
                  label="Tarde (12:00 - 16:00)"
                  value="Tarde"
                  checked={selectedPeriod === "Tarde"}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar selección
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AvailabilityUser;
