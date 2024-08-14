import HttpClient from "@/utilities/HttpClient.utility";
import { ApiResponse } from "@/types/common";

export const getUsers = async (): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get("/users");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getUsers ~ error:", error);
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<ApiResponse> => {
  if (!userId) throw new Error("userId es requerido");
  try {
    const response = await HttpClient.get(`/users/${userId}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getUserById ~ error:", error);
    throw error;
  }
};

interface UpdatePasswordRequestData {
  password: string;
  repeatPassword: string;
}
export const updateUserPassword = async (data: UpdatePasswordRequestData, userId: string): Promise<ApiResponse> => {
  if (data.password !== data.repeatPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  try {
    const response = await HttpClient.put(`/users/${userId}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ updateUserPassword ~ error:", error);
    throw error;
  }
};

export const updateUser = async (data: any, userId: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.put(`/users/${userId}`, data);
    console.log("🚀 ~ updateUser ~ response:", response);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ updateUserPassword ~ error:", error);
    throw error;
  }
};

export const getUsersTemplate = async (): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.get("/users/template");
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ getUsersTemplate ~ error:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
  try {
    const response = await HttpClient.delete(`/users/${userId}`);
    console.log("🚀 ~ deleteUser ~ response:", response);
    return {
      status: response.status,
    };
  } catch (error) {
    console.error("🚀 ~ deleteUser ~ error:", error);
    throw error;
  }
};