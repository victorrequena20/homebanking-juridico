import HttpClient from "@/utilities/HttpClient.utility";

export const getClients = async () => {
  try {
    const response = await HttpClient.get("/clients");
    console.log("🚀 ~ getClients ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ constgetClients ~ error:", error);
  }
};
