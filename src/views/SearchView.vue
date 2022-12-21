<template lang="html">
  <div class="search-view" :class="{ found: spotifyStore.getSpotify }">
    <SearchInput :found="spotifyStore.getSpotify" />
    <div class="w-100 d-flex flex-column">
      <ListGroup
        v-for="(track, key) in spotifyStore.getSpotify"
        :key="key"
        :track="track.data"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchInput from "@/components/inputs/SearchInput.vue";
import ListGroup from "@/components/ListGroup.vue";
import { useSpotifyStore } from "@/store/spotify";
import { onUnmounted } from "vue";

const spotifyStore = useSpotifyStore();

onUnmounted(() => {
  spotifyStore.clearStore();
});
</script>

<style scoped lang="scss">
$tundora: #4b4848;
$turqoise: #17ead9;
$hint: #faf8f8;

.search-view {
  font-family: "Montserrat", "Helevtica", sans-serif;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: darken($hint, 4%);
  color: $tundora;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: background-color 1.25s ease-in-out;
  &.is-focus {
    background-color: $turqoise;
  }
  &.found {
    display: initial;
  }
}
</style>
