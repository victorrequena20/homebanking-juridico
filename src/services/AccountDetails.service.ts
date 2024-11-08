// import { dateFormat } from "@/constants/global";
import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getAccountById = async (accountId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/savingsaccounts/${accountId}?associations=all`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getAccountById ~ error:", error);
    throw error;
  }
};
