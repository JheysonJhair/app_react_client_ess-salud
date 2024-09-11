import Swal from "sweetalert2";

function validateForm(formId: string): boolean {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) {
    console.error(`No se encontró el formulario con ID: ${formId}`);
    return false;
  }
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

function handleSave(formId: string) {
  if (validateForm(formId)) {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Formulario guardado correctamente!",
    });
  }
}

function handleReset(formId: string) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto borrará todos los datos del formulario.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      const form = document.getElementById(formId) as HTMLFormElement | null;
      if (form) {
        form.reset();
        Swal.fire("Borrado!", "El formulario ha sido limpiado.", "success");
      } else {
        console.error(`No se encontró el formulario con ID: ${formId}`);
      }
    }
  });
}

function Trainings() {
  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Administrador</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Cargar enlaces de recursos
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        {/* Tarjeta 1: Enlace de Zoom */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm">
            <div
              className="card-header  text-white"
              style={{ backgroundColor: "#005792" }}
            >
              <h5 className="card-title mb-0">Enlace de Zoom</h5>
            </div>
            <div className="card-body">
              <form id="zoomForm">
                {/* Enlace de Zoom */}
                <div className="mb-3">
                  <label htmlFor="zoomLink" className="form-label">
                    Enlace de Zoom
                  </label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      id="zoomLink"
                      placeholder="Ingrese el enlace de Zoom"
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-info-circle"></i>
                    </span>
                  </div>
                  <small className="text-muted">
                    Ingrese el enlace de la reunión de Zoom.
                  </small>
                </div>

                {/* Día y Hora de Zoom */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="zoomDay" className="form-label">
                      Día de la reunión
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="zoomDay"
                      required
                    />
                    <small className="text-muted">
                      Seleccione el día de la reunión.
                    </small>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="zoomTime" className="form-label">
                      Hora de la reunión
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="zoomTime"
                      required
                    />
                    <small className="text-muted">
                      Seleccione la hora de inicio.
                    </small>
                  </div>
                </div>

                {/* Descripción del Zoom */}
                <div className="mb-3">
                  <label htmlFor="zoomDescription" className="form-label">
                    Descripción del Zoom
                  </label>
                  <textarea
                    className="form-control"
                    id="zoomDescription"
                    placeholder="Ingrese una descripción sobre el propósito de la reunión de Zoom"
                  ></textarea>
                  <small className="text-muted">
                    Proporcione detalles adicionales sobre el enlace de Zoom.
                  </small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary w-45"
                    onClick={() => handleSave("zoomForm")}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-45"
                    onClick={() => handleReset("zoomForm")}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Enlace de Video */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#005792" }}
            >
              <h5 className="card-title mb-0">Enlace de Video</h5>
            </div>
            <div className="card-body">
              <form id="videoForm">
                {/* Enlace de Video */}
                <div className="mb-3">
                  <label htmlFor="videoLink" className="form-label">
                    Enlace de Video
                  </label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      id="videoLink"
                      placeholder="Ingrese el enlace del video"
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-info-circle"></i>
                    </span>
                  </div>
                  <small className="text-muted">
                    Ingrese el enlace del video que desea compartir.
                  </small>
                </div>

                {/* Descripción del Video */}
                <div className="mb-3">
                  <label htmlFor="videoDescription" className="form-label">
                    Descripción del Video
                  </label>
                  <textarea
                    className="form-control"
                    id="videoDescription"
                    placeholder="Ingrese una descripción sobre el contenido del video"
                  ></textarea>
                  <small className="text-muted">
                    Proporcione detalles adicionales sobre el video.
                  </small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary w-45"
                    onClick={() => handleSave("videoForm")}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-45"
                    onClick={() => handleReset("videoForm")}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Enlace del Curso */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card shadow-sm">
            <div
              className="card-header  text-white"
              style={{ backgroundColor: "#005792" }}
            >
              <h5 className="card-title mb-0">Enlace del Curso</h5>
            </div>
            <div className="card-body">
              <form id="courseForm">
                {/* Enlace del Curso */}
                <div className="mb-3">
                  <label htmlFor="courseLink" className="form-label">
                    Enlace del Curso
                  </label>
                  <div className="input-group">
                    <input
                      type="url"
                      className="form-control"
                      id="courseLink"
                      placeholder="Ingrese el enlace del curso"
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-info-circle"></i>
                    </span>
                  </div>
                  <small className="text-muted">
                    Ingrese el enlace del curso correspondiente.
                  </small>
                </div>

                {/* Descripción del Curso */}
                <div className="mb-3">
                  <label htmlFor="courseDescription" className="form-label">
                    Descripción del Curso
                  </label>
                  <textarea
                    className="form-control"
                    id="courseDescription"
                    placeholder="Ingrese una descripción sobre el contenido del curso"
                  ></textarea>
                  <small className="text-muted">
                    Proporcione detalles adicionales sobre el curso.
                  </small>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary w-45"
                    onClick={() => handleSave("courseForm")}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary w-45"
                    onClick={() => handleReset("courseForm")}
                  >
                    Limpiar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trainings;
