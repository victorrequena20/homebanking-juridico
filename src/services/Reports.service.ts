import HttpClient from "@/utilities/HttpClient.utility";

export const getReports = async () => {
  try {
    const response = await HttpClient.get("/reports");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getReports ~ error:", error);
  }
};

export const getRunReportsFullParameterList = async (params?: any) => {
  try {
    const response = await HttpClient.get("/runreports/FullParameterList", { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getRunReportsOfficeIdSelectOne ~ error:", error);
  }
};

export const getRunReportsOptionsByParamName = async (parameterName?: string, params?: any) => {
  try {
    const response = await HttpClient.get(`/runreports/${parameterName}`, { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getRunReportsOptionsByParamName ~ error:", error);
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
    console.error("🚀 ~ getReportsTemplate ~ error:", error);
  }
};

export const createReport = async (data: any) => {
  try {
    const response = await HttpClient.post("/reports", data);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("🚀 ~ createReport ~ error:", error);
  }
};

export const runReport = async (reportName: string, params: any) => {
  try {
    const response = await HttpClient.get(`/runreports/${reportName}`, { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("🚀 ~ runReport ~ error:", error);
  }
};
