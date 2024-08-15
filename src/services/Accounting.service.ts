import HttpClient from "@/utilities/HttpClient.utility";

export const getGlAccounts = async () => {
  try {
    const response = await HttpClient.get("/glaccounts");
    console.log("🚀 ~ getGlAccounts ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("accounting ~ error:", error);
  }
};

export const getAccountingRules = async () => {
  try {
    const response = await HttpClient.get("/accountingrules");
    console.log("🚀 ~ getAccountingRules ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("accounting ~ error:", error);
  }
};

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
