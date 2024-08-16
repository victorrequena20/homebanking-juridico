import HttpClient from "@/utilities/HttpClient.utility";

export const getOffices = async (params?: any) => {
  try {
    const response = await HttpClient.get("/offices", params);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getOffices ~ error:", error);
  }
};

export const createOffice = async (data: any) => {
  try {
    const response = await HttpClient.post("/offices", data);
    console.log("🚀 ~ createOffice ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getOffices ~ error:", error);
  }
};
