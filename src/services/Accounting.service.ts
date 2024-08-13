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
