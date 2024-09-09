function AvailabilityUser() {
  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Administrador</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Crear espacio para tiempo y disponibilidad
          </li>
        </ol>
      </nav>

      {/* Horarios seleccionados */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h5>Horarios seleccionados:</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Hora / Día</th>
                <td>Lunes</td>
                <td>Martes</td>
                <td>Miercoles</td>
                <td>Jueves</td>
                <td>Viernes</td>
                <td>Sabado</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08:00 - 12:00</td>
                <td>Resevado</td> 
                <td>Disponible</td> 
                <td>Disponible</td> 
                <td>Disponible</td>
                <td>Disponible</td>
                <td>Reservado</td>
              </tr> 
              <tr>
                <td>12:00 - 16:00</td>
                <td>Disponible</td> 
                <td>Disponible</td> 
                <td>Disponible</td>
                <td>Disponible</td>
                <td>Reservado</td>
                <td>-</td> {/* Sin horario de tarde */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón para guardar y seleccionar nuevo horario */}
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-between">
          <button className="btn btn-primary">Modificar horario</button>
          <button className="btn btn-secondary">Elegir horario vacío</button>
        </div>
      </div>
    </div>
  );
  }
  
  export default AvailabilityUser