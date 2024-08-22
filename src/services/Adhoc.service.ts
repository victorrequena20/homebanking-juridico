import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";

export const getAdhocquery = async (): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get("/adhocquery");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getAdhocquery ~ error:", error);
    throw error;
  }
};

export const createAdhocquery = async (data: any): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.post(`/adhocquery`, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("🚀 ~ createAdhocquery ~ error:", error);
      throw error;
    }
  };