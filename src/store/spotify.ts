import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

const api = "https://spotify23.p.rapidapi.com";
const options = {
  params: {
    q: "",
    type: "multi",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": "f1c9b7bff6msh6ce128dd9894ed2p1185d2jsna3727f8b0c21",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

export const useSpotifyStore = defineStore("spotifyStore", () => {
  const spotify = ref();

  const searchSpotify = async (searchString: string) => {
    options.params.q = searchString;
    spotify.value = await axios.get(`${api}/search/`, options).then((data) => {
      return data.data.tracks.items;
    });
    console.log(spotify.value);
  };

  const getSpotify = computed(() => {
    return spotify.value;
  });

  return {
    spotify,
    searchSpotify,
    getSpotify,
  };
});
