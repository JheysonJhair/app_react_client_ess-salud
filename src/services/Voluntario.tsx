import { Volunteer, ApiResponse } from "../types/Volunteer";

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api";

//---------------------------------------------------------------- GET VOLUNTEER
export async function obtenerVoluntarios(): Promise<Volunteer[]> {
  try {
    const response = await fetch(`${API_URL}/user`);
    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de voluntarios");
    }
    const responseData: ApiResponse = await response.json();
    if (!responseData.success) {
      throw new Error(`API: ${responseData.msg}`);
    }
    return responseData.data || [];
  } catch (error) {
    console.error("API: Error al obtener los voluntarios", error);
    return [];
  }
}

//---------------------------------------------------------------- POST VOLUNTEER
export async function crearVoluntario(
  voluntario: Partial<Volunteer>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/user/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voluntario),
    });
    if (!response.ok) {
      throw new Error("API: Error al crear el voluntario");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al crear el voluntario: ${error}`);
  }
}

//---------------------------------------------------------------- PUT VOLUNTEER
export async function actualizarVoluntario(
  voluntario: Partial<Volunteer>
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/user/update`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voluntario),
    });
    if (!response.ok) {
      throw new Error("API: Error al actualizar el voluntario");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al actualizar el voluntario: ${error}`);
  }
}

//---------------------------------------------------------------- DELETE VOLUNTEER
export async function eliminarVoluntario(
  voluntarioId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/user/Delete/${voluntarioId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("API: Error al eliminar el voluntario");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al eliminar el voluntario: ${error}`);
  }
}
