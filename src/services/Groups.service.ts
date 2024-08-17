import { ApiResponse } from "@/types/common";
import HttpClient from "@/utilities/HttpClient.utility";

export const getGroups = async (params?: any) => {
  try {
    const response = await HttpClient.get("/groups", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getGroups ~ error:", error);
  }
};

export const createGroup = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.post(`/groups`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createGroup ~ error:", error);
    throw error;
  }
};

export const getGroupsTemplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/groups/template", { params });
    console.log("🚀 ~ getGroupsTemplate ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getGroupsTemplate ~ error:", error);
  }
};
