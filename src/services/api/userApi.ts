import axiosClient from "./index";
import { AxiosResponse } from "axios";

export default {
  login(payload: { password: string; login: string }): Promise<AxiosResponse> {
    return axiosClient.post("auth/sign-in", payload);
  },
  signUp(properties: Record<string, string>): Promise<AxiosResponse> {
    return axiosClient.post("/auth/sign-up", properties);
  },
  getMe(): Promise<AxiosResponse> {
    return axiosClient.get("users/me");
  },
};
