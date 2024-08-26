import HttpClient from "@/utilities/HttpClient.utility";

export const getLoans = async (params?: any) => {
  try {
    const response = await HttpClient.get("/loans", { params });
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log("🚀 ~ getLoans ~ error:", error);
  }
};

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

export const getLoanProductsTemplate = async () => {
  try {
    const response = await HttpClient.get("/loanproducts/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getLoanProductsTemplate ~ error:", error);
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

export const getLoanReassignmentTemaplate = async (params?: any) => {
  try {
    const response = await HttpClient.get("/loans/loanreassignment/template", { params });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getLoanReassignmentTemaplate ~ error:", error);
  }
};

export const createLoanReassignment = async (data: any) => {
  try {
    const response = await HttpClient.post("/loans/loanreassignment", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createLoanReassignment ~ error:", error);
  }
};
