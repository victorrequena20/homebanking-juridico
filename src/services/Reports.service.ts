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

export const getReportsTemplate = async () => {
  try {
    const response = await HttpClient.get("/reports/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getReportsTemplate ~ error:", error);
  }
};

export const createReport = async (data: any) => {
  try {
    const response = await HttpClient.post("/reports", data);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getReportsTemplate ~ error:", error);
  }
};
