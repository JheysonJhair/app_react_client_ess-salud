import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { User } from "../../../types/User";
import {
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
} from "../../../services/Usuario";
import { Modal, Button, Form } from "react-bootstrap";
import { formatearFecha } from "../../../utils/util";
import { obtenerCentros } from "../../../services/HealthCenter";
import { HealthCenter } from "../../../types/HealthCenter";

export function Users() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<Partial<User>>({});

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
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  //---------------------------------------------------------------- GET HEALTH CENTERS
  useEffect(() => {
    const fetchHealthCenters = async () => {
      const centros = await obtenerCentros();
      setHealthCenters(centros);
    };

    fetchHealthCenters();
  }, []);

  //---------------------------------------------------------------- GET USERS
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await obtenerUsuarios();
        data = data.filter(
          (usuario: User) => usuario.rol == 1 || usuario.rol == 2
        );
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchData();
  }, []);

  //---------------------------------------------------------------- DELETE USER
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
          const updatedUsuarios = usuarios.filter(
            (usuario) => usuario.idUsuario !== id
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

  const handleOpenModal = (usuario: User) => {
    setEditUser({
      ...usuario,
      cumpleanos: usuario.cumpleanos
        ? new Date(usuario.cumpleanos).toISOString().split("T")[0]
        : "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser({});
  };

  //---------------------------------------------------------------- UPDATE USER
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await actualizarUsuario({
        ...editUser,
      });
      if (response.success) {
        setUsuarios(
          usuarios.map((user) =>
            user.idUsuario === editUser.idUsuario
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
            <a href="#">Usuario</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Lista de usuarios
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuario..."
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
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.nombresCompletos}</td>
                  <td>{usuario.dni}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.email}</td>
                  <td>
                    {usuario.cumpleanos
                      ? formatearFecha(usuario.cumpleanos)
                      : "N/A"}
                  </td>
                  <td>{usuario.CentroSalud?.nombreSalud}</td>
                  <td>{usuario.departamento}</td>
                  <td>
                    {usuario.rol === 1
                      ? "Administrador"
                      : usuario.rol === 2
                      ? "Super Administrador"
                      : "Desconocido"}
                  </td>

                  <td>{usuario.password}</td>
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
                        handleEliminarUsuario(usuario.idUsuario || 0)
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
              <div className="col-md-5 mb-3">
                <Form.Group controlId="formFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombres y apelldios"
                    value={editUser.nombresCompletos || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        nombresCompletos: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-4 mb-3">
                <Form.Group controlId="formDni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="DNI"
                    value={editUser.dni || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, dni: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-3 mb-3">
                <Form.Group controlId="formRol">
                  <Form.Label>Rol</Form.Label>
                  <Form.Control
                    as="select"
                    value={editUser.rol || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        rol: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar rol</option>
                    <option value={1}>Administrador</option>
                    <option value={2}>Super Administrador</option>
                  </Form.Control>
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
                <Form.Group controlId="formCentroSalud">
                  <Form.Label>Centro de Salud</Form.Label>
                  <Form.Control
                    as="select"
                    value={editUser.CentroSalud?.idCentroSalud || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        idCentroSalud: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar Centro de Salud</option>
                    {healthCenters.map((centro) => (
                      <option
                        key={centro.idCentroSalud}
                        value={centro.idCentroSalud}
                      >
                        {centro.nombreSalud}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-md-6 mb-3">
                <Form.Group controlId="formDepartamento">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Control
                    as="select"
                    value={editUser.departamento || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
                        departamento: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccionar Departamento</option>
                    <option value="Lima">Lima</option>
                    <option value="Cusco">Cusco</option>
                    <option value="Arequipa">Arequipa</option>
                  </Form.Control>
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
                    value={editUser.password || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
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
                    value={editUser.cumpleanos || ""}
                    onChange={(e) =>
                      setEditUser({
                        ...editUser,
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
