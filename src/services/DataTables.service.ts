import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getDataTables = async (params?: any) => {
  try {
    const response = await HttpClient.get("/datatables", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getDataTables ~ error:", error);
  }
};

export const createDataTable = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/datatables`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ createDataTable ~ error:", error);
    throw error;
  }
};
