import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getStaffs = async (params: any) => {
  try {
    const response = await HttpClient.get("/staff", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getStaffs ~ error:", error);
  }
};

export const runAccruals = async (data: any) => {
  try {
    const response = await HttpClient.post("/runaccruals", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ runAccruals ~ error:", error);
  }
};

export const getWorkDays = async () => {
  try {
    const response = await HttpClient.get("/workingdays");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getWorkDays ~ error:", error);
  }
};

// ----- Currencies start -----

export const getCurrencies = async () => {
  try {
    const response = await HttpClient.get("/currencies");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getCurrencies ~ error:", error);
  }
};

export const updateCurrencies = async (data: any) => {
  try {
    const response = await HttpClient.put("/currencies", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ updateCurrencies ~ error:", error);
  }
};

// ----- End currencies -----

export const getPasswordPreferences = async () => {
  try {
    const response = await HttpClient.get("/passwordpreferences/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getPasswordPreferences ~ error:", error);
  }
};

export const updatePasswordPreferences = async (data: any) => {
  try {
    const response = await HttpClient.put("/passwordpreferences", data);
    console.log("🚀 ~ updatePasswordPreferences ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updatePasswordPreferences ~ error:", error);
  }
};

export const getSmsCampaignsTemplate = async () => {
  try {
    const response = await HttpClient.get("/smscampaigns/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getSmsCampaignsTemplate ~ error:", error);
  }
};

// ----- Codes start -----

export const getCodes = async () => {
  try {
    const response = await HttpClient.get("/codes");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCodes ~ error:", error);
  }
};

export const getCodeById = async (codeId: string): Promise<ApiResponse> => {
  if (!codeId) throw new Error("codeId es requerido");
  try {
    const response = await HttpClient.get(`/codes/${codeId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCodeById ~ error:", error);
    throw error;
  }
};

export const getCodeValuesById = async (codeValueId: string): Promise<ApiResponse> => {
  if (!codeValueId) throw new Error("codeValueId es requerido");
  try {
    const response = await HttpClient.get(`/codes/${codeValueId}/codevalues`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCodeValuesById ~ error:", error);
    throw error;
  }
};

export const createCode = async (data: any) => {
  try {
    const response = await HttpClient.post("/codes", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ createCode ~ error:", error);
  }
};

export const createCodeValue = async (data: any, codeId: string) => {
  try {
    const response = await HttpClient.post(`/codes/${codeId}/codevalues`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createCodeValue ~ error:", error);
  }
};

export const updateCode = async (data: any, codeId: string) => {
  try {
    const response = await HttpClient.put(`/codes/${codeId}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updateCode ~ error:", error);
  }
};

export const updateCodeValue = async (data: any, codeId: string, codeValueId: string) => {
  try {
    const response = await HttpClient.put(`/codes/${codeId}/codevalues/${codeValueId}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updateCodeValue ~ error:", error);
  }
};

export const deleteCode = async (codeId: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/codes/${codeId}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ deleteCode ~ error:", error);
    throw error;
  }
};

export const deleteValueCode = async (codeId: string, codeValueId: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/codes/${codeId}/codevalues/${codeValueId}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ deleteValueCode ~ error:", error);
    throw error;
  }
};

// ----- Codes end -----
