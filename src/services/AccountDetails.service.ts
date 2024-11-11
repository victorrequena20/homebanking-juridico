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

export const getDocumentsById = async (accountId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/savings/${accountId}/documents`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getDocuments ~ error:", error);
    throw error;
  }
};

export const getNotesById = async (accountId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/savings/${accountId}/notes`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getNotes ~ error:", error);
    throw error;
  }
};
