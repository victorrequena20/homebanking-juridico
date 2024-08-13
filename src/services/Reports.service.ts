import HttpClient from "@/utilities/HttpClient.utility";

export const getReports = async () => {
  try {
    const response = await HttpClient.get("/reports");
    console.log("🚀 ~ getReports ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getReports ~ error:", error);
  }
};
