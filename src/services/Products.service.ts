import HttpClient from "@/utilities/HttpClient.utility";

export const getCommissions = async () => {
  try {
    const response = await HttpClient.get("/charges");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCommissions ~ error:", error);
  }
};

export const getChargesTemplate = async () => {
  try {
    const response = await HttpClient.get("/charges/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getChargesTemplate ~ error:", error);
  }
};

export const createCharge = async (data: any) => {
  try {
    const response = await HttpClient.post("/charges", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createCharge ~ error:", error);
  }
};
