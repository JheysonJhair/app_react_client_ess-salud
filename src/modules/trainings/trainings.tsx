
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
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Cargar Enlaces de Recursos</h5>
            </div>
            <div className="card-body">
              <form>
                {/* Enlace de Zoom */}
                <div className="mb-3">
                  <label htmlFor="zoomLink" className="form-label">Enlace de Zoom</label>
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
                  <small className="text-muted">Ingrese el enlace de la reunión de Zoom.</small>
                </div>

                {/* Día y Hora de Zoom */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="zoomDay" className="form-label">Día de la reunión</label>
                    <input
                      type="date"
                      className="form-control"
                      id="zoomDay"
                      required
                    />
                    <small className="text-muted">Seleccione el día de la reunión.</small>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="zoomTime" className="form-label">Hora de la reunión</label>
                    <input
                      type="time"
                      className="form-control"
                      id="zoomTime"
                      required
                    />
                    <small className="text-muted">Seleccione la hora de inicio.</small>
                  </div>
                </div>

                {/* Descripción del Zoom */}
                <div className="mb-3">
                  <label htmlFor="zoomDescription" className="form-label">Descripción del Zoom</label>
                  <textarea
                    className="form-control"
                    id="zoomDescription"
                    rows="3"
                    placeholder="Ingrese una descripción sobre el propósito de la reunión de Zoom"
                  ></textarea>
                  <small className="text-muted">Proporcione detalles adicionales sobre el enlace de Zoom.</small>
                </div>

                {/* Enlace de Video */}
                <div className="mb-3">
                  <label htmlFor="videoLink" className="form-label">Enlace de Video</label>
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
                  <small className="text-muted">Ingrese el enlace del video que desea compartir.</small>
                </div>

                {/* Descripción del Video */}
                <div className="mb-3">
                  <label htmlFor="videoDescription" className="form-label">Descripción del Video</label>
                  <textarea
                    className="form-control"
                    id="videoDescription"
                    rows="3"
                    placeholder="Ingrese una descripción sobre el contenido del video"
                  ></textarea>
                  <small className="text-muted">Proporcione detalles adicionales sobre el video.</small>
                </div>

                {/* Enlace de Curso */}
                <div className="mb-3">
                  <label htmlFor="courseLink" className="form-label">Enlace del Curso</label>
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
                  <small className="text-muted">Ingrese el enlace del curso correspondiente.</small>
                </div>

                {/* Descripción del Curso */}
                <div className="mb-3">
                  <label htmlFor="courseDescription" className="form-label">Descripción del Curso</label>
                  <textarea
                    className="form-control"
                    id="courseDescription"
                    rows="3"
                    placeholder="Ingrese una descripción sobre el contenido del curso"
                  ></textarea>
                  <small className="text-muted">Proporcione detalles adicionales sobre el curso.</small>
                </div>

                {/* Botón para agregar más enlaces */}
                <div className="mb-3">
                  <button type="button" className="btn btn-outline-secondary w-100">
                    Agregar más enlaces
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary w-45">Guardar</button>
                  <button type="reset" className="btn btn-secondary w-45">Limpiar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  
  export default Trainings