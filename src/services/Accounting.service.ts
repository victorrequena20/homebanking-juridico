import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getGlAccounts = async (params?: any) => {
  try {
    const response = await HttpClient.get("/glaccounts", { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("accounting ~ error:", error);
  }
};

export const getAccountingRules = async (params?: any) => {
  try {
    const response = await HttpClient.get("/accountingrules", { params });
    console.log("🚀 ~ getAccountingRules ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("accounting ~ error:", error);
  }
};

// ----- Gl accounts/closures start -----

export const getGlclosures = async () => {
  try {
    const response = await HttpClient.get("/glclosures");
    console.log("🚀 ~ getGlclosures ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getGlclosures ~ error:", error);
  }
};

export const getGlAccountsTemplate = async () => {
  try {
    const response = await HttpClient.get("/glaccounts/template");
    console.log("🚀 ~ getGlAccountsTemplate ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getGlAccountsTemplate ~ error:", error);
  }
};

export const getGlAccountsTemplateById = async (accountId: string) => {
  try {
    const response = await HttpClient.get(`/glaccounts/${accountId}`, { params: { template: true } });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getGlAccountsTemplate ~ error:", error);
  }
};

export const createGlAccount = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/glaccounts`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createGlAccount ~ error:", error);
    throw error;
  }
};

export const getGlClosureById = async (glClosureId: string): Promise<ApiResponse> => {
  if (!glClosureId) throw new Error("glClosureId es requerido");
  try {
    const response = await HttpClient.get(`/glclosures/${glClosureId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getGlClosureById ~ error:", error);
    throw error;
  }
};

export const createGlClosure = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/glclosures`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createGlClosure ~ error:", error);
    throw error;
  }
};

export const updateGlClosure = async (data: any, id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.put(`/glclosures/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updateGlClosure ~ error:", error);
    throw error;
  }
};

export const deleteGlClosure = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/glclosures/${id}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ deleteGlClosure ~ error:", error);
    throw error;
  }
};

export const deleteGlAccount = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/glaccounts/${id}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ deleteGlAccount ~ error:", error);
    throw error;
  }
};

export const updateGlAccount = async (data: any, id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.put(`/glaccounts/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updateGlAccount ~ error:", error);
    throw error;
  }
};

export const getFinancialActivityAccountsTemplate = async () => {
  try {
    const response = await HttpClient.get("/financialactivityaccounts/template");
    console.log("🚀 ~ getFinancialActivityAccounts ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getFinancialActivityAccountsTemplate ~ error:", error);
  }
};

export const getFinancialActivityAccounts = async () => {
  try {
    const response = await HttpClient.get("/financialactivityaccounts");
    console.log("🚀 ~ getFinancialActivityAccounts ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getFinancialActivityAccounts ~ error:", error);
  }
};

export const createFinancialActivity = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/financialactivityaccounts`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createFinancialActivity ~ error:", error);
    throw error;
  }
};

// ----- Gl accounts/closures start -----

// ----- Provisioning entries start -----
export const createProvisioningEntries = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/provisioningentries`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createProvisioningEntries ~ error:", error);
    throw error;
  }
};
// ----- Provisioning entries end -----
