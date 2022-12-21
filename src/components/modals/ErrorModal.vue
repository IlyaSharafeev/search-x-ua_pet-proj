<template lang="pug">
AppModal(:is-open="isOpen", @close="close()")
  template(v-slot:content)
    div
      h1 {{ textError }}
</template>

<script setup>
import AppModal from "./AppModal";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  textError: { type: String, default: null },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style scoped></style>
