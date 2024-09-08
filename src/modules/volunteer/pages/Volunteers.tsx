import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import { Modal, Button, Form } from "react-bootstrap";

import { User } from "../../../types/User";
import {
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
} from "../../../services/Usuario";

export function Volunteers() {
  const [voluntario, setVoluntarios] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [voluntarioPorPagina] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editVolunter, setEditVolunter] = useState<Partial<User>>({});

  const indexOfLastVoluntario = currentPage * voluntarioPorPagina;
  const indexOfFirstVoluntario = indexOfLastVoluntario - voluntarioPorPagina;
  const currentVoluntario = voluntario.slice(
    indexOfFirstVoluntario,
    indexOfLastVoluntario
  );

  const filteredVoluntario = currentVoluntario.filter((voluntario) =>
    Object.values(voluntario).some((value) =>
      (value ? value.toString().toLowerCase() : "").includes(
        searchTerm.toLowerCase()
      )
    )
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //---------------------------------------------------------------- GET CLIENTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await obtenerUsuarios();
        data = data.filter((voluntario: User) => voluntario.rol == "user");
        setVoluntarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchData();
  }, []);
  //---------------------------------------------------------------- DELETE CLIENT
  const handleEliminarUsuario = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, elimínalo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        const response = await eliminarUsuario(id);
        if (response.success) {
          const updatedUsuarios = voluntario.filter(
            (voluntario) => voluntario.IdUser !== id
          );
          setVoluntarios(updatedUsuarios);
          await Swal.fire(
            "¡Eliminado!",
            "El usuario ha sido eliminado.",
            "success"
          );
        } else {
          await Swal.fire("Error", response.msg, "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al eliminar el voluntario", "error");
    }
  };

  const handleOpenModal = (voluntario: User) => {
    setEditVolunter(voluntario);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditVolunter({});
  };

  //---------------------------------------------------------------- UPDATE CLIENT
  const handleUpdateVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await actualizarUsuario({
        ...editVolunter,
        rol: "",
      });
      if (response.success) {
        setVoluntarios(
          voluntario.map((voluntario) =>
            voluntario.IdUser === editVolunter.IdUser
              ? { ...voluntario, ...editVolunter }
              : voluntario
          )
        );
        await Swal.fire("¡Actualizado!", response.msg, "success");
        handleCloseModal();
      } else {
        await Swal.fire("Error", response.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al actualizar el usuario", "error");
    }
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Voluntarios</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Lista de Voluntarios
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar voluntario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              <th>Nombres y apellidos</th>
              <th>DNI</th>
              <th>Dirección</th>
              <th>Email</th>
              <th>Cumpleaños</th>

              <th>C. Salud</th>
              <th>Departamento</th>
              <th>Rol</th>

              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoluntario.length > 0 ? (
              filteredVoluntario.map((voluntario, index) => (
                <tr key={index}>
                  <td>{voluntario.nombresCompletos}</td>
                  <td>{voluntario.dni}</td>
                  <td>{voluntario.direccion}</td>
                  <td>{voluntario.email}</td>
                  <td>{voluntario.cumpleanos}</td>
                  <td>{voluntario.idCentroSalud}</td>
                  <td>{voluntario.departamento}</td>
                  <td>{voluntario.rol}</td>
                  <td>{voluntario.password}</td>

                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>

                  <td>{voluntario.password}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleOpenModal(voluntario)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleEliminarUsuario(voluntario.IdUser || 0)
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center">
                  No se encontraron voluntarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="pagination justify-content-center">
        {Array.from(
          { length: Math.ceil(voluntario.length / voluntarioPorPagina) },
          (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateVolunteer}>
            <div className="row">
              <div className="col-md-12 mb-3">
                <Form.Group controlId="formFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombres y apelldios"
                    value={editVolunter.nombresCompletos || ""}
                    onChange={(e) =>
                      setEditVolunter({
                        ...editVolunter,
                        nombresCompletos: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DNI"
                    value={editVolunter.dni || ""}
                    onChange={(e) =>
                      setEditVolunter({ ...editVolunter, dni: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formAddress">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dirección"
                    value={editVolunter.direccion || ""}
                    onChange={(e) =>
                      setEditVolunter({
                        ...editVolunter,
                        direccion: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formMail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={editVolunter.email || ""}
                    onChange={(e) =>
                      setEditVolunter({
                        ...editVolunter,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={editVolunter.password || ""}
                    onChange={(e) =>
                      setEditVolunter({
                        ...editVolunter,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formMail">
                  <Form.Label>Cumpleaños</Form.Label>
                  <Form.Control
                    type="date"
                    value={editVolunter.cumpleanos || ""}
                    onChange={(e) =>
                      setEditVolunter({
                        ...editVolunter,
                        cumpleanos: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
