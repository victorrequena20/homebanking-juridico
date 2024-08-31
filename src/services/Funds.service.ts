import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getFunds = async () => {
  try {
    const response = await HttpClient.get("/funds");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getFunds ~ error:", error);
  }
};

export const getFundById = async (id: any) => {
  try {
    const response = await HttpClient.get(`/funds/${id}`);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("🚀 ~ getFundById ~ error:", error);
  }
};

export const createFund = async (data: any) => {
  try {
    const response = await HttpClient.post("/funds", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createFund ~ error:", error);
  }
};

export const updateFund = async (data: any, id: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.put(`/funds/${id}`, data);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ updateFund ~ error:", error);
    throw error;
  }
};
