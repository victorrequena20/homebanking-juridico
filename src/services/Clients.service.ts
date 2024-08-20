import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getClients = async () => {
  try {
    const response = await HttpClient.get("/clients");
    console.log("🚀 ~ getClients ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ constgetClients ~ error:", error);
  }
};

export const getClientById = async (clientId?: string) => {
  try {
    const response = await HttpClient.get(`/clients/${clientId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getClientByid ~ error:", error);
  }
};

export const createClient = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/clients`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createClient ~ error:", error);
    throw error;
  }
};

export const getTemplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/clients/template", { params });
    console.log("🚀 ~ getTemplate ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplate ~ error:", error);
  }
};

// Accounts
export const getAccountsById = async (clientId?: string) => {
  try {
    const response = await HttpClient.get(`/clients/${clientId}/accounts`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getAccountsById ~ error:", error);
  }
};
