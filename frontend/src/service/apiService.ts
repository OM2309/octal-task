import axios, { AxiosResponse, AxiosError } from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postApi = async <T, B>(endpoint: string, body: B): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, body);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "POST request failed:",
      err.response ? err.response.data : err.message
    );
    throw error;
  }
};
