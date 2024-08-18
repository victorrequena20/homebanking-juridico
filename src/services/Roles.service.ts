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

  export const createRole = async (data: any): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.post("/roles", data);
      console.log("🚀 ~ createRole ~ response:", response);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("🚀 ~ getRoles ~ error:", error);
      return {
        data: null,
        status: 0,
      }
    }
  };
  