<template lang="pug">
.stop-watch
  .stop-watch__item(ref="secondsSpan") 00
  .stop-watch__item :
  .stop-watch__item(ref="tensSpan") 00
</template>

<script lang="ts" setup>
import { defineProps, defineExpose, ref } from "vue";
import { useTimeStore } from "@/store/timer";

let seconds = ref(0);
let tens = ref(0);
let secondsSpan = ref(null);
let tensSpan = ref(null);
let Interval: number | undefined;

defineProps({
  toggle: Boolean,
});

const timeStore = useTimeStore();

const startStopWatchOnClick = () => {
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
};

const stopTimer = (isEndTimer: boolean) => {
  if (isEndTimer) {
    if (!timeStore.getTime) {
      let tempArray = [String(seconds.value)];
      timeStore.addTime(tempArray);
      clearInterval(Interval);
      return;
    }
    timeStore.addTime([...timeStore.getTime, ...String(seconds.value)]);
    clearInterval(Interval);
  }
  clearInterval(Interval);
};

const resetTimer = () => {
  tens.value = 0;
  seconds.value = 0;
  secondsSpan.value.innerHTML = "00";
  tensSpan.value.innerHTML = "00";
};

defineExpose({
  startStopWatchOnClick,
  stopTimer,
  resetTimer,
  seconds,
});

const startTimer = () => {
  tens.value++;

  if (tens.value <= 9) {
    tensSpan.value.innerHTML = "0" + tens.value;
  }

  if (tens.value > 9) {
    tensSpan.value.innerHTML = "" + tens.value;
  }

  if (tens.value > 99) {
    seconds.value++;
    secondsSpan.value.innerHTML = "0" + seconds.value;
    tens.value = 0;
    tensSpan.value.innerHTML = "0" + 0;
  }

  if (seconds.value > 9) {
    secondsSpan.value.innerHTML = "" + seconds.value;
  }
};
</script>

<style lang="scss" scoped>
.stop-watch {
  display: flex;
  gap: 15px;
  .stop-watch__item {
    font-size: 26px;
    color: aliceblue;
  }
}
</style>
