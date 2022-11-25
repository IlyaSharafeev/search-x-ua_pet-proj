import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const data = ref({});
    const accessToken = ref(localStorage.getItem("accessToken"));
    const refreshToken = ref(localStorage.getItem("refreshToken"));
    const rememberMe = ref(false);

    function setTokens(payload: {
      accessToken: string;
      refreshToken: string;
      rememberMe?: boolean;
    }): void {
      refreshToken.value = payload.refreshToken;
      accessToken.value = payload.accessToken;
      if (typeof payload.rememberMe === "boolean") {
        rememberMe.value = payload.rememberMe;
      }
      localStorage.setItem("accessToken", payload.accessToken);
      if (rememberMe.value || localStorage.getItem("refreshToken")) {
        localStorage.setItem("refreshToken", payload.refreshToken);
      }
    }

    function clear() {
      data.value = {};
      accessToken.value = "";
      refreshToken.value = "";
      rememberMe.value = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    return { data, accessToken, refreshToken, rememberMe, setTokens, clear };
  },
  {
    persist: true,
  }
);
