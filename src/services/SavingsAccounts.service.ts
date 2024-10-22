import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const depositTransaction = async (id: string, data: any, params?: any): Promise<ApiResponse> => {
  console.log("🚀 ~ depositTransaction ~ data:", data);
  try {
    const response = await HttpClient.post(`/savingsaccounts/${id}/transactions`, data, {
      params: {
        ...params,
        command: "deposit",
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("🚀 ~ depositTransaction ~ error:", error);
    throw error;
  }
};
