import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";

export const getholidaysById = async (holidayId?: string) => {
  try {
    const response = await HttpClient.get(`/holidays/${holidayId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getholidaysById ~ error:", error);
  }
};

  export const getholidaysByOfficeId = async (officeId: string) => {
    try {
      const response = await HttpClient.get('/holidays', {
        params: { officeId }, // Pasa el officeId como un parámetro de consulta
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getholidaysByOfficeId ~ error:", error);
      throw error; // Opcional: Lanza el error para manejarlo en el llamado
    }
  };

  export const getConfigurationByid = async (params?: any, id?: string) => {
    try {
      const response = await HttpClient.get(`/configurations/${id}`, { params });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getConfigurationByid ~ error:", error);
    }
  };
