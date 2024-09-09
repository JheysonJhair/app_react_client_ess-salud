function Attendance() {
    return (
      <div className="page-content">
        <nav className="page-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Voluntario</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Crear espacio reguistro de atenciones y si hubiera insidentes
            </li>
          </ol>
        </nav>
  
        <div className="row">
      
              
        {/* Primer Apartado: Hora de Ingreso, Hora de Salida, Actividades, Incidentes */}
        <div className="mb-4">
          <h2>Registro de Ingreso y Actividades</h2>
          <form>
            <div className="form-group">
              <label htmlFor="entryDate">Fecha de Ingreso</label>
              <input type="date" className="form-control" id="entryDate" />
            </div>
            <div className="form-group">
              <label htmlFor="entryTime">Hora de Ingreso</label>
              <input type="time" className="form-control" id="entryTime" />
            </div>
            <div className="form-group">
              <label htmlFor="exitTime">Hora de Salida</label>
              <input type="time" className="form-control" id="exitTime" />
            </div>
            <div className="form-group">
              <label htmlFor="activities">Registro de Actividades</label>
              <textarea className="form-control" id="activities" rows="3" placeholder="Ingrese detalles de las actividades"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="incidents">Registro de Incidentes</label>
              <textarea className="form-control" id="incidents" rows="3" placeholder="Ingrese detalles de los incidentes"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar Reporte</button>
          </form>
        </div>
        </div>
      </div>
    )
  }
  
  export default Attendance