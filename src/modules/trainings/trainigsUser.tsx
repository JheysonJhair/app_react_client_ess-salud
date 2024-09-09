function TradinUser() {
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

      

        {/* Registro de Actividades en Centros de Salud */}
        <div className="table-container mt-4">
          <h4 className="mb-4">Lista de Actividades Centros de Salud</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Día de Zoom | Hora</th>
                <th>Hora</th>
                <th>Enlace de Zoom</th>
                <th>Descripcion de Zoom</th>
                <th>Enlace de Video</th>
                <th>Descripcion de Video</th>
                <th>Enlace de Curso</th>
                <th>Descripcion de Curso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10/09/2024 08:00 am</td>
                <td>08:00 am</td>
                <td>https://us06web.zoom</td>
                <td>Atencion al cliente</td>
                <td>lik- yputube</td>
                <td>Empatia y buentrato</td>
                <td>Link Curso</td>
                <td>Curso para mejora de carisma</td>
              </tr>
              <tr>
              <td>10/09/2024 08:00 am</td>
                <td>07:00 pm</td>
                <td>https://us06web.zoom</td>
                <td>Atencion al cliente</td>
                <td>lik- yputube</td>
                <td>Empatia y buentrato</td>
                <td>Link Curso</td>
                <td>Curso para mejora de carisma</td>
              </tr>
            </tbody>
          </table>
        </div><br />

          {/* Segundo Apartado: Tipo de Actividad y Comentario */}
          <div>
          <h4>Actividades Participadas</h4>
          <form>
            <div className="form-group">
              <label htmlFor="activityDate">Fecha</label>
              <input type="date" className="form-control" id="activityDate" />
            </div>
            <div className="form-group">
              <label htmlFor="activityType">Tipo de Actividad</label>
              <select className="form-control" id="activityType">
                <option value="zoom">Zoom</option>
                <option value="video">Video</option>
                <option value="course">Curso</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="activityComment">Comentario</label>
              <textarea className="form-control" id="activityComment" rows="3" placeholder="Ingrese detalles de lo que vio"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar Actividad</button>
          </form>
        </div>
      </div>
  );
}

export default TradinUser


