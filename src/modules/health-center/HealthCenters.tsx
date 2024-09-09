import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

import { Modal, Button, Form } from "react-bootstrap";
import { HealthCenter } from "../../types/HealthCenter";
import {
  actualizarCentro,
  eliminarCentro,
  obtenerCentros,
} from "../../services/HealthCenter";

export function HealthCenters() {
  const [usuarios, setUsuarios] = useState<HealthCenter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<Partial<HealthCenter>>({});

  const indexOfLastUsuario = currentPage * usuariosPorPagina;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
  const currentUsuarios = usuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const filteredUsuarios = currentUsuarios.filter((usuario) =>
    Object.values(usuario).some((value) =>
      (value ? value.toString().toLowerCase() : "").includes(
        searchTerm.toLowerCase()
      )
    )
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await obtenerCentros();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchData();
  }, []);

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
        const response = await eliminarCentro(id);
        if (response.success) {
          const updatedUsuarios = usuarios.filter(
            (usuario) => usuario.idCentroSalud !== id
          );
          setUsuarios(updatedUsuarios);
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
      Swal.fire("Error", "Hubo un error al eliminar el usuario", "error");
    }
  };

  const handleOpenModal = (usuario: HealthCenter) => {
    setEditUser(usuario);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser({});
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await actualizarCentro({
        ...editUser,
      });
      if (response.success) {
        setUsuarios(
          usuarios.map((user) =>
            user.idCentroSalud === editUser.idCentroSalud
              ? { ...user, ...editUser }
              : user
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
            <a href="#">Cnetro de salud</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Lista de centros
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar centro..."
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
              <th>Centro de salud</th>
              <th>Código</th>
              <th>Número de telefono</th>
              <th>Email</th>
              <th>Direccción</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nombreSalud}</td>
                  <td>{usuario.codigo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.departamento}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleOpenModal(usuario)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleEliminarUsuario(usuario.idCentroSalud || 0)
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
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="pagination justify-content-center">
        {Array.from(
          { length: Math.ceil(usuarios.length / usuariosPorPagina) },
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
          <Form onSubmit={handleUpdateUser}>
            <div className="row">
              <div className="col-md-12 mb-3">
                <Form.Group controlId="formFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombres y apelldios"
                    value={editUser.nombreSalud || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        nombreSalud: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formDni">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="+51"
                    value={editUser.telefono || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, telefono: e.target.value })
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
                    value={editUser.direccion || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
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
                    value={editUser.email || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
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
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="000000"
                    value={editUser.codigo || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        codigo: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group controlId="formMail">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Control
                    type="text"
                    value={editUser.departamento || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        departamento: e.target.value,
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
