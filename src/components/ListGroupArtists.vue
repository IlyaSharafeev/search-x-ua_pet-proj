<template lang="pug">
small {{ artists.profile.name }}
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  artists: Object,
  default: () => undefined,
});
</script>

<style lang="scss" scoped></style>
