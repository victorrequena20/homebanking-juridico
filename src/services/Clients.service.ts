import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getClients = async (params?: any) => {
  try {
    const response = await HttpClient.get("/clients", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ constgetClients ~ error:", error);
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

export const getIdentifiers = async (clientId?: any) => {
  try {
    const response = await HttpClient.get(`/clients/${clientId}/identifiers`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getIdentifiers ~ error:", error);
  }
};

export const getClientAddressesTemplate = async () => {
  try {
    const response = await HttpClient.get(`/client/addresses/template`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getClientAddressesTemplate ~ error:", error);
  }
};

export const addAddress = async (data: any, clientId: any, type: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/client/${clientId}/address`, data, { params: { type } });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
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

// Actions
export const clientActions = async (clientId?: string, data?: any, params?: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/clients/${clientId}`, data, { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ clientActions ~ error:", error);
    throw error;
  }
};

export const deleteCliente = async (clientId: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/clients/${clientId}`);
    return { status: response.status };
  } catch (error) {
    console.error("🚀 ~ deleteCliente ~ error:", error);
    throw error;
  }
};

export const getTemplateAddComission = async (id?: string) => {
  try {
    const response = await HttpClient.get(`/clients/${id}/charges/template`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplateAddComission ~ error:", error);
  }
};

export const addComission = async (id: string, body: { amount: number; chargeId: number; dateFormat?: string; locale?: string; dueDate: string }) => {
  try {
    body.locale = "es";
    body.dateFormat = "dd MMMM yyyy";

    const response = await HttpClient.post(`/clients/${id}/charges`, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ addComission ~ error:", error);
  }
};

export const getTemplateCollateralManagement = async () => {
  try {
    const response = await HttpClient.get(`/collateral-management`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplateCollateralManagement ~ error:", error);
  }
};

export const createCollateralManagement = async (id: string, body: { collateralId: number; quantity: string; locale?: string }) => {
  try {
    body.locale = "es";
    const response = await HttpClient.post(`/clients/${id}/collaterals`, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplateCollateralManagement ~ error:", error);
  }
};

export const getTemplateAssignAdviser = async (id: string) => {
  try {
    const response = await HttpClient.get(`/clients/${id}?template=true&staffInSelectedOfficeOnly=true`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplateAssignAdviser ~ error:", error);
  }
};

export const assignAndDeallocateAdviser = async (id: string, body: { staffId: number }, assign: boolean) => {
  try {
    const response = await HttpClient.post(`/clients/${id}?command=${assign ? "assignStaff" : "unassignStaff"}`, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTemplateAssignAdviser ~ error:", error);
  }
};
