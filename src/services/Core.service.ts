import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

// ----- Staff start -----

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

export const createStaff = async (data: any) => {
  try {
    const response = await HttpClient.post("/staff", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createStaff ~ error:", error);
  }
};

// ----- Staff end -----

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

// -----Working days start -----

export const updateWorkDays = async (data: any) => {
  try {
    const response = await HttpClient.put("/workingdays", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("��� ~ updateWorkDays ~ error:", error);
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

// -----Working days end -----

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

// ----- Permissions start -----

export const getPermissions = async (params?: any) => {
  console.log("🚀 ~ getPermissions ~ params:", params);
  try {
    const response = await HttpClient.get("/permissions", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getPermissions ~ error:", error);
  }
};

export const updatePermissions = async (data: any) => {
  try {
    const response = await HttpClient.put(`/permissions`, data, { params: { makerCheckerable: true } });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updatePermission ~ error:", error);
  }
};

// ----- Permissions end -----

// ----- Notifications start -----

export const getNotifications = async () => {
  try {
    const response = await HttpClient.get("/notifications", { params: { isRead: true } });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getNotifications ~ error:", error);
  }
};

// ----- Notifications end -----

// ----- Centers start -----

export const getCenters = async (params?: any) => {
  try {
    const response = await HttpClient.get("/centers", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getNotifications ~ error:", error);
  }
};

export const getCentersTemplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/centers/template", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCentersTemplate ~ error:", error);
  }
};

export const createCenter = async (data: any) => {
  try {
    const response = await HttpClient.post(`/centers`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createCenter ~ error:", error);
  }
};

// ----- Centers end -----

// ----- Payment types start -----

export const getPaymentTypes = async (params?: any) => {
  try {
    const response = await HttpClient.get("/paymenttypes", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getPaymentTypes ~ error:", error);
  }
};

export const createPaymentType = async (data: any) => {
  try {
    const response = await HttpClient.post(`/paymenttypes`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ paymentType ~ error:", error);
  }
};

// ----- Payment types end -----

// ----- Journal entries start -----

export const createJournalEntry = async (data: any) => {
  try {
    const response = await HttpClient.post(`/journalentries`, data);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ createJournalEntry ~ error:", error);
  }
};

export const getJournalEntries = async (params?: any) => {
  try {
    const response = await HttpClient.get("/journalentries", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getJournalEntries ~ error:", error);
  }
};

// ----- Journal entries end -----

// ----- Inversionistas start -----

export const searchExternalAssetOwners = async (data?: any) => {
  try {
    const response = await HttpClient.post(`/external-asset-owners/search`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ searchExternalAssetOwners ~ error:", error);
  }
};

// ----- Inversionistas end -----

// ----- entity data tables ckecks start -----

export const createEntityDataTablesChecks = async (data?: any) => {
  try {
    const response = await HttpClient.post(`/entityDatatableChecks`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createEntityDataTablesChecks ~ error:", error);
  }
};

export const getEntityDataTablesChecks = async (params?: any) => {
  try {
    const response = await HttpClient.get("/entityDatatableChecks", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getEntityDataTablesChecks ~ error:", error);
  }
};

export const getEntityDataTablesChecksTemplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/entityDatatableChecks/template", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getEntityDataTablesChecksTemplate ~ error:", error);
  }
};

export const deleteTableVerification = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/entityDatatableChecks/${id}`);
    return {
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ deleteTableVerification ~ error:", error);
    throw error;
  }
};

// ----- entity data tables ckecks end -----

// ----- Tellers start -----

export const getTellers = async (params?: any) => {
  try {
    const response = await HttpClient.get("/tellers", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTellers ~ error:", error);
  }
};

export const createCashier = async (data?: any) => {
  try {
    const response = await HttpClient.post(`/tellers`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createCashier ~ error:", error);
  }
};

// ----- Pistas de auditorias start -----

export const getAudits = async (params?: any) => {
  try {
    const response = await HttpClient.get("/audits", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getAudits ~ error:", error);
  }
};

// ----- Pistas de auditorias end -----

// ----- Configuraciones start -----

export const getConfigurations = async (params?: any) => {
  try {
    const response = await HttpClient.get("/configurations", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getConfigurations ~ error:", error);
  }
};

export const getConfigurationByid = async (params?: any, id?: string) => {
  try {
    const response = await HttpClient.get(`/configurations/${id}`, { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getConfigurationByid ~ error:", error);
  }
};

export const updateConfigurations = async (data: any, id?: string) => {
  try {
    const response = await HttpClient.put(`/configurations/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("��� ~ updateWorkDays ~ error:", error);
  }
};

// ----- Configuraciones end -----

// ----- External events configuration start -----

export const getExternalEventsConfiguration = async (params?: any) => {
  try {
    const response = await HttpClient.get("/externalevents/configuration", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getExternalEvents ~ error:", error);
  }
};

export const updateExternalEventsConfigurations = async (data: any) => {
  try {
    const response = await HttpClient.put(`/externalevents/configuration`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ updateExternalEventsConfigurations ~ error:", error);
  }
};

// ----- External events configuration end -----

// ----- Hooks start -----

export const getHooks = async (params?: any) => {
  try {
    const response = await HttpClient.get("/hooks", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getHooks ~ error:", error);
  }
};

export const getHooksTemplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/hooks/template", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getHooksTemplate ~ error:", error);
  }
};

export const createHook = async (data?: any) => {
  try {
    const response = await HttpClient.post(`/hooks`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createHook ~ error:", error);
  }
};

// ----- Hooks end -----

// ----- Floating rates start -----

export const getFloatingRates = async (params?: any) => {
  try {
    const response = await HttpClient.get("/floatingrates", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getFloatingRates ~ error:", error);
  }
};

// ----- Floating rates end -----
