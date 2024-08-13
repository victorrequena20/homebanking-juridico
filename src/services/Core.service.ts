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
