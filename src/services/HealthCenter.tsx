import { HealthCenter, ApiResponse } from "../types/HealthCenter";

const API_URL = "https://project-essalud-production.up.railway.app/api";

//---------------------------------------------------------------- GET HEALTH CENTER
export async function obtenerCentros(): Promise<HealthCenter[]> {
  try {
    const response = await fetch(`${API_URL}/centro-salud/getAll`);
    if (!response.ok) {
      throw new Error("API: Error al obtener los datos de centros");
    }
    const responseData: ApiResponse = await response.json();
    if (!responseData.success) {
      throw new Error(`API: ${responseData.msg}`);
    }
    return responseData.data || [];
  } catch (error) {
    console.error("API: Error al obtener los centros", error);
    return [];
  }
}

//---------------------------------------------------------------- POST HEALTH CENTER
export async function crearCentro(
  center: Partial<HealthCenter>
): Promise<{ msg: string; success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/centro-salud/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(center),
    });
    if (!response.ok) {
      throw new Error("API: Error al crear el center");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al crear el center: ${error}`);
  }
}

//---------------------------------------------------------------- PUT HEALTH CENTER
export async function actualizarCentro(
  center: Partial<HealthCenter>
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/centro-salud/update`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(center),
    });
    if (!response.ok) {
      throw new Error("API: Error al actualizar el centro");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al actualizar el centro: ${error}`);
  }
}

//---------------------------------------------------------------- DELETE HEALTH CENTER
export async function eliminarCentro(
  centerId: number
): Promise<{ msg: string; success: boolean }> {
  try {
    const url = `${API_URL}/centro-salud/delete/${centerId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("API: Error al eliminar el centro");
    }
    const responseData: { msg: string; success: boolean } =
      await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`API: Error al eliminar el centro: ${error}`);
  }
}
