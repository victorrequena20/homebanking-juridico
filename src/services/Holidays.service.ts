import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";
 
  export const getholidaysById = async (holidayId?: string) => {
    try {
      const response = await HttpClient.get(`/holidays/${holidayId}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getholidaysById ~ error:", error);
    }
  };

  export const getholidaysByOfficeId = async (officeId: string) => {
    try {
      const response = await HttpClient.get('/holidays', { params: { officeId }, });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.log("🚀 ~ getholidaysByOfficeId ~ error:", error);
      throw error; 
    }
  };
