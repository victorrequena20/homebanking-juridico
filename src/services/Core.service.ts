import HttpClient from "@/utilities/HttpClient.utility";

export const getStaffs = async (params: any) => {
  try {
    const response = await HttpClient.get("/staff", { params });
    console.log("🚀 ~ getStaffs ~ response:", response);
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
    console.log("🚀 ~ getCodes ~ response:", response);
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
    console.log("🚀 ~ runAccruals ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ runAccruals ~ error:", error);
  }
};
