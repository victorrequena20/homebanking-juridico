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

export const getWithdrawalDetailById = async (transactionId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/accounttransfers/${transactionId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getWithdrawalDetailById ~ error:", error);
    throw error;
  }
};

export const getDepositDetailById = async (accountId?: string, transactionId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/savingsaccounts/${accountId}/transactions/${transactionId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getDepositDetailById ~ error:", error);
    throw error;
  }
};

export const undoDepositById = async (accountId?: string, transactionId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/savingsaccounts/${accountId}/transactions/${transactionId}?command=undo`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ undoDepositById ~ error:", error);
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
