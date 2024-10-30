import HttpClient from "@/utilities/HttpClient.utility";

export const StandingInstructionRunHistory = async (params?: any) => {
  try {
    const urlString = new URLSearchParams(params).toString();
    const response = await HttpClient.get(`/standinginstructionrunhistory?${urlString}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ StandingInstructionRunHistory ~ error:", error);
  }
};

export const WorkingDays = async (params?: any) => {
  try {
    const response = await HttpClient.put("/workingdays", params);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ WorkingDays ~ error:", error);
  }
};
