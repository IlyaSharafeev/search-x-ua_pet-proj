<template lang="pug">
.list-group
  a.list-group-item.list-group-item-action(:href="track.uri")
    .d-flex.w-100.justify-content-between
      h5.mb-1 {{ track.name }}
      small 3 days ago
    p.mb-1 Some placeholder content in a paragraph.
    ListGroupArtists(
      v-for="(artist, key) of track.artists.items",
      :key="key",
      :artists="artist"
    )
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import ListGroupArtists from "@/components/ListGroupArtists.vue";

defineProps({
  track: {
    type: Object,
    default: () => undefined,
  },
});
</script>

<style scoped lang="scss">
.list-group {
  width: 100%;
  border-radius: 0;
}
</style>
