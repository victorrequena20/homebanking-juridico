import HttpClient from "@/utilities/HttpClient.utility";

export const getUsers = async () => {
  try {
    const response = await HttpClient.get("/users");
    console.log("🚀 ~ getUsers ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getUsers ~ error:", error);
  }
};
