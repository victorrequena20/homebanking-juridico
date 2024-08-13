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
