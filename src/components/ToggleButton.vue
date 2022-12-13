<template lang="pug">
button.fill(v-if="toggle === 'restart'", @click="restart") Restart
button.fill(v-else-if="toggle === 'stop'", @click="stop") Stop
button.fill(v-else, @click="start") Start
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  toggle: String,
  default: () => "",
});

const emit = defineEmits(["restart", "start", "stop"]);
const restart = () => {
  emit("restart");
};

const start = () => {
  emit("start");
};

const stop = () => {
  emit("stop");
};
</script>

<style lang="scss" scoped>
.fill {
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid white;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
</style>
