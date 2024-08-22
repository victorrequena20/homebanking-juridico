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

export const getFamilyMembers = async (clientId?: string) => {
  try {
    const response = await HttpClient.get(`/clients/${clientId}/familymembers`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ gteFamilyMembers ~ error:", error);
  }
};

export const addFamilyMember = async (data: any, clientId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/clients/${clientId}/familymembers`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createClient ~ error:", error);
    throw error;
  }
};

export const getIdentifierTemplate = async (clientId?: any) => {
  try {
    const response = await HttpClient.get(`/clients/${clientId}/identifiers/template`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getIdentifierTemplate ~ error:", error);
  }
};

export const addIdentifier = async (data: any, clientId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/clients/${clientId}/identifiers`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ addIdentifier ~ error:", error);
    throw error;
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
