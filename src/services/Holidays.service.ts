import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";

export const getholidaysById = async (holidayId?: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get(`/holidays/${holidayId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log("🚀 ~ getholidaysById ~ error:", error);
    throw error;
  }
};

  export const getholidaysByOfficeId = async (officeId: string): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.get('/holidays', { params: { officeId } });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getholidaysByOfficeId ~ error:", error);
      throw error; 
    }
  };

  export const createholiday = async (data: any): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.post(`/holidays`, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ createholiday ~ error:", error);
      throw error;
    }
  };

  export const getPaymentType = async (): Promise<ApiResponse> => {
    try {
      const response = await HttpClient.get('/holidays/template');
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getPaymentType ~ error:", error);
      throw error;
    }
  };
