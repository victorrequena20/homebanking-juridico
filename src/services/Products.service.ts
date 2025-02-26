import HttpClient from "@/utilities/HttpClient.utility";

export const createLoanProduct = async (data: any) => {
  try {
    const response = await HttpClient.post("/loanproducts", data);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("🚀 ~ createLoanProduct ~ error:", error);
  }
};

export const getCommissions = async () => {
  try {
    const response = await HttpClient.get("/charges");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getCommissions ~ error:", error);
  }
};

export const getChargesTemplate = async () => {
  try {
    const response = await HttpClient.get("/charges/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getChargesTemplate ~ error:", error);
  }
};

export const createCharge = async (data: any) => {
  try {
    const response = await HttpClient.post("/charges", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createCharge ~ error:", error);
  }
};

export const createGuarantee = async (data: any) => {
  try {
    const response = await HttpClient.post("/collateral-management", data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ createGuarantee ~ error:", error);
  }
};

export const getGuarantees = async () => {
  try {
    const response = await HttpClient.get("/collateral-management");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getGuarantees ~ error:", error);
  }
};

export const getGuaranteesTemplate = async () => {
  try {
    const response = await HttpClient.get("/collateral-management/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getGuaranteesTemplate ~ error:", error);
  }
};

// ----- Administrar configuraciones de impuestos start -----

export const getTaxesComponents = async () => {
  try {
    const response = await HttpClient.get("/taxes/component");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTaxesComponents ~ error:", error);
  }
};

export const getTaxesGroups = async () => {
  try {
    const response = await HttpClient.get("/taxes/group");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getTaxesGroups ~ error:", error);
  }
};

// ----- Administrar configuraciones de impuestos start -----

// ------- Productos pasivo -----------------

export const getProductsPassives = async () => {
  try {
    const response = await HttpClient.get("/savingsproducts");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getProductsPassives ~ error:", error);
  }
};

export const getProductPassiveInfoById = async (loanId: number, params: any) => {
  try {
    const response = await HttpClient.get(`/savingsproducts/${loanId}?template=false`, { params });
    console.log("🚀 ~ getProductPassiveInfoById ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getProductPassiveInfoById ~ error:", error);
  }
};
