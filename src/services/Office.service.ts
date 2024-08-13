import HttpClient from "@/utilities/HttpClient.utility";

export const getOffices = async () => {
  try {
    const response = await HttpClient.get("/offices");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getOffices ~ error:", error);
  }
};
