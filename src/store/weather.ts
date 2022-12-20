import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

const api = "https://weatherapi-com.p.rapidapi.com/current.json";

const options = {
  params: { q: "" },
  headers: {
    "X-RapidAPI-Key": "f1c9b7bff6msh6ce128dd9894ed2p1185d2jsna3727f8b0c21",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export const useWeatherStore = defineStore("weather", () => {
  const weather = ref(null);
  const loadingVisible = ref(false);
  const stateErrorModal = ref(false);

  const setWeatherCurrentLocation = async (searchLocation: string) => {
    options.params.q = searchLocation;
    loadingVisible.value = true;
    await axios
      .get(`${api}`, options)
      .then((response) => {
        weather.value = response.data;
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        openErrorModal();
      });
    loadingVisible.value = true;
  };

  const openErrorModal = () => {
    stateErrorModal.value = true;
  };

  const closeErrorModal = () => {
    stateErrorModal.value = false;
  };

  const getWeatherCurrentLocation = computed(() => weather.value);
  const getSpinnerState = computed(() => loadingVisible.value);
  const getStateErrorModal = computed(() => stateErrorModal.value);

  return {
    weather,
    setWeatherCurrentLocation,
    getWeatherCurrentLocation,
    getSpinnerState,
    getStateErrorModal,
    closeErrorModal,
  };
});
