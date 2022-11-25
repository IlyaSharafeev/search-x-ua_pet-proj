import axios from "axios";
import router from "@/router";
import { useUserStore } from "@/store/user";

interface Subscriber {
  (token: string): void;
}

const baseURL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : ``;
const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
let subscribers: Subscriber[] = [];
let isRefreshing = false;

function onRefreshed(accessToken: string): void {
  subscribers.map((cb) => cb(accessToken));
}

function subscribeTokenRefresh(cb: Subscriber): void {
  subscribers.push(cb);
}

axiosClient.interceptors.request.use(
  (request) => {
    const userStore = useUserStore();
    if (request.headers && userStore.accessToken) {
      request.headers.Authorization = `Bearer ${userStore.accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const userStore = useUserStore();
    const originalRequest = error.config;
    const refreshToken: string | null = userStore.refreshToken;
    if (error.response.status === 401) {
      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;
          axios
            .post(`${baseURL}/auth/refresh-token`, {
              refreshToken: refreshToken,
            })
            .then((response) => {
              const { accessToken, refreshToken } =
                response.data.data.attributes;
              userStore.setTokens({ accessToken, refreshToken });
              isRefreshing = false;
              onRefreshed(accessToken);
              subscribers = [];
            })
            .catch(() => {
              userStore.clear();
              router.push("/login");
            });
        }
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          });
        });
      } else {
        userStore.clear();
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
