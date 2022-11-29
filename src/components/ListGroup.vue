<template lang="pug">
.list-group
  a.list-group-item.list-group-item-action(:href="track.uri")
    .d-flex.w-100.justify-content-between
      h5.mb-1 {{ trackName }}
      small 3 days ago
    p.mb-1 Some placeholder content in a paragraph.
    small And some small print.
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { computed } from "vue";

const props = defineProps({
  track: {
    type: Object,
    default: () => undefined,
  },
});

const trackName = computed(() => {
  return props.track?.name;
});
</script>

<style scoped lang="scss">
.list-group {
  width: 100%;
}
</style>
