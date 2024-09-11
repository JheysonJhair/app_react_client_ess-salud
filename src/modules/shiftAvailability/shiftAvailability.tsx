import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface Horario {
  periodo: string;
  dias: {
    [key: string]: string;
  };
}

function Availability() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [horarios, setHorarios] = useState<Horario[]>([
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
      const periodKey =
        selectedPeriod === "Mañana" ? "08:00 - 12:00" : "12:00 - 16:00";
      const selectedHorario = horarios.find(
        (horario) => horario.periodo === periodKey
      );

      if (selectedHorario) {
        if (selectedHorario.dias[selectedDay] === "Reservado") {
          Swal.fire({
            title: "Horario ya reservado",
            text: `El horario del ${selectedDay} en el periodo ${selectedPeriod} ya está reservado.`,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        } else {
          setHorarios((prevHorarios) =>
            prevHorarios.map((horario) =>
              horario.periodo === periodKey
                ? {
                    ...horario,
                    dias: {
                      ...horario.dias,
                      [selectedDay]: "Reservado",
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

  const handleRemoveReservation = (periodo: string, dia: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la reserva para ${dia} en el periodo ${periodo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setHorarios((prevHorarios) =>
          prevHorarios.map((horario) =>
            horario.periodo === periodo
              ? {
                  ...horario,
                  dias: {
                    ...horario.dias,
                    [dia]: "Disponible",
                  },
                }
              : horario
          )
        );
  
        Swal.fire(
          'Eliminado!',
          'La reserva ha sido eliminada.',
          'success'
        );
      }
    });
  };
  

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Turno y disponibilidad</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Verificar turno
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
                  {Object.keys(horario.dias).map((dia) => (
                    <td key={dia}>
                      {horario.dias[dia] === "Reservado" ? (
                        <>
                          {horario.dias[dia] + " "}
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            className="text-danger"
                            onClick={() =>
                              handleRemoveReservation(horario.periodo, dia)
                            }
                            icon={faTrash}
                          />
                        </>
                      ) : (
                        <>
                          {"Disponible "}
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-success"
                          />
                        </>
                      )}
                    </td>
                  ))}
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

export default Availability;
