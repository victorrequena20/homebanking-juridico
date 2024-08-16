import HttpClient from "@/utilities/HttpClient.utility";

export const getLoanProducts = async () => {
  try {
    const response = await HttpClient.get("/loanproducts");
    console.log("🚀 ~ getLoanProducts ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getLoanProducts ~ error:", error);
  }
};

export const getLoanInfoById = async (loanId: number, params: any) => {
  try {
    const response = await HttpClient.get(`/loanproducts/${loanId}`, { params });
    console.log("🚀 ~ getLoanInfoById ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getLoanInfoById ~ error:", error);
  }
};
