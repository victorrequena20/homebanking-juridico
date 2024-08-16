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
