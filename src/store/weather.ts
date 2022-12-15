import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

const api = "https://weatherapi-com.p.rapidapi.com/current.json";

const options = {
  params: { q: "Lviv" },
  headers: {
    "X-RapidAPI-Key": "d6318cbb8dmsha9d0ea67d7d12dap19e98fjsn97783168f7e2",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

export const useWeatherStore = defineStore("weather", () => {
  const weather = ref();

  const setWeatherCurrentLocation = async (searchLocation: string) => {
    options.params.q = searchLocation;
    weather.value = await axios.get(`${api}`, options).then((data) => {
      return data.data.tracks.items;
    });
  };

  const getWeatherCurrentLocation = computed(() => {
    return weather.value;
  });

  return {
    weather,
    setWeatherCurrentLocation,
    getWeatherCurrentLocation,
  };
});
