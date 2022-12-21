import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import { Tracks } from "@/types/Tracks";

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
    "X-RapidAPI-Key": process.env.VUE_APP_SPOTIFY_API_KEY,
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
  };

  const clearStore = () => {
    spotify.value = null;
  };

  const getSpotify = computed((): Tracks => {
    return spotify.value;
  });

  return {
    spotify,
    searchSpotify,
    getSpotify,
    clearStore,
  };
});
