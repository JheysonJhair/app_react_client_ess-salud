function Reports() {
  return (
    <div className="row">
      {/* Contenido principal de la página */}
      <div className="page-content">

        {/* Breadcrumb para navegación */}
        <nav className="page-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Reporte</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Voluntario - Administrador
            </li>
          </ol>
        </nav>

        {/* Sección: Registro de Actividades en Centros de Salud */}
        <div className="table-container mt-4">
          <h4 className="mb-4">Registro de Actividades Centros de Salud</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Centro de Salud</th>
                <th>Fecha</th>
                <th>Actividad</th>
                <th>Voluntario</th>
                <th>Comentario actividad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Centro de Salud 1</td>
                <td>10/09/2024</td>
                <td>Capacitación</td>
                <td>Voluntario 1</td>
                <td>Capacitación sobre primeros auxilios</td>
              </tr>
              <tr>
                <td>Centro de Salud 2</td>
                <td>11/09/2024</td>
                <td>Evaluación</td>
                <td>Voluntario 2</td>
                <td>Evaluación de instalaciones</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sección: Registro de Actividades Administrador */}
        <div className="table-container mt-4">
          <h4 className="mb-4">Registro de Actividades Administrador</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Cargo</th>
                <th>Centro de Salud</th>
                <th>Tipo actividad</th>
                <th>Comentario actividad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identificación Personal</td>
                <td>Día de Registro</td>
                <td>Super admin || admin</td>
                <td>Nombre del centro</td>
                <td>link | Capacitación | curso | Evaluación</td>
                <td>Comentario de actividad</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sección: Registro de Actividades Voluntariado */}
        <div className="table-container mt-4">
          <h4 className="mb-4">Registro de Actividades Voluntariado</h4>
          <table className="table table-bordered">
            <thead>
            <tr>
                <th>Voluntario</th>
                <th>Fecha</th>
                <th>Turno</th>
                <th>Hora</th>
                <th>Email</th>
                <th>Actividades</th>
                <th>Incidentes</th>
                <th>Comentario supervisor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan</td>
                <td>12/12/2014</td>
                <td>Mañana</td>
                <td>08:00 || 12:00</td>
                <td>1233@hotmail.com</td>
                <td>Actividades en el día</td>
                <td>Descripción de Incidentes</td>
                <td>Descripción de supervisión</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;
