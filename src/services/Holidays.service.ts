import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";

export const getRoles = async (): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.get("/roles");
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("🚀 ~ getRoles ~ error:", error);
      throw error;
    }
  };

  export const getholidaysById = async (holidayId: string): Promise<ApiResponse> => {
    if (!holidayId) throw new Error("holidayId es requerido");
    try {
      const response = await HttpClient.get(`/holidays/${holidayId}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("🚀 ~ getholidayIdById ~ error:", error);
      throw error;
    }
  };
