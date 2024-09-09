function Evaluation() {
  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Administrador</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Revisión de Evaluación
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Revisión de Evaluación</h5>
            </div>
            <div className="card-body">
              <form>
                {/* Nombre Completo */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value="Juan Pérez"
                    disabled
                  />
                </div>

                {/* DNI */}
                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">DNI</label>
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    value="12345678"
                    disabled
                  />
                </div>

                {/* Certificado */}
                <div className="mb-3">
                  <label htmlFor="certificate" className="form-label">Certificado</label>
                  <input
                    type="text"
                    className="form-control"
                    id="certificate"
                    value="CERT-001"
                    disabled
                  />
                </div>

                {/* Edad */}
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    value="30"
                    disabled
                  />
                </div>

                {/* CV */}
                <div className="mb-3">
                  <label htmlFor="cv" className="form-label">Currículum Vitae</label>
                  <a href="#" className="btn btn-outline-primary w-100">Ver CV (PDF)</a>
                </div>

                {/* No haber sido retirado */}
                <div className="mb-3">
                  <label className="form-label">Estado en el voluntariado</label>
                  <input
                    type="text"
                    className="form-control"
                    value="No ha sido retirado del voluntariado de EsSalud"
                    disabled
                  />
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-success w-45">Aceptar</button>
                  <button type="button" className="btn btn-danger w-45">Rechazar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Evaluation;
