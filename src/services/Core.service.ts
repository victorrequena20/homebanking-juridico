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
