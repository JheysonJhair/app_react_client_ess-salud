

function ReportsAdmin() {
  // Datos de ejemplo para los reportes
  const activities = [
    {
      userId: 'U001',
      entryDate: '2024-09-08',
      entryTime: '08:00',
      exitTime: '17:00',
      activities: 'Revisión de informes',
      incidents: 'Ninguno'
    },
    {
      userId: 'U002',
      entryDate: '2024-09-08',
      entryTime: '09:00',
      exitTime: '18:00',
      activities: 'Desarrollo de características',
      incidents: 'Problema con el servidor'
    }
  ];

  const detailedActivities = [
    {
      userId: 'U001',
      activityDate: '2024-09-08',
      activityType: 'Curso',
      activityComment: 'Curso de React'
    },
    {
      userId: 'U002',
      activityDate: '2024-09-08',
      activityType: 'Video',
      activityComment: 'Tutorial de JavaScript'
    }
  ];

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Administrador</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Reportes de Administradores
          </li>
        </ol>
      </nav>

      <div className="container mt-4">
        {/* Registro de Actividades e Incidentes */}
        <div className="table-container mb-4">
          <h4 className="mb-4">Registro de Actividades e Incidentes</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID de Usuario</th>
                <th>Fecha de Ingreso</th>
                <th>Hora de Ingreso</th>
                <th>Hora de Salida</th>
                <th>Actividades</th>
                <th>Incidentes</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((report, index) => (
                <tr key={index}>
                  <td>{report.userId}</td>
                  <td>{report.entryDate}</td>
                  <td>{report.entryTime}</td>
                  <td>{report.exitTime}</td>
                  <td>{report.activities}</td>
                  <td>{report.incidents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Registro de Actividades Detalladas */}
        <div className="table-container mb-4">
          <h4 className="mb-4">Registro de Actividades Detalladas</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID de Usuario</th>
                <th>Fecha de Actividad</th>
                <th>Tipo de Actividad</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {detailedActivities.map((report, index) => (
                <tr key={index}>
                  <td>{report.userId}</td>
                  <td>{report.activityDate}</td>
                  <td>{report.activityType}</td>
                  <td>{report.activityComment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReportsAdmin;
