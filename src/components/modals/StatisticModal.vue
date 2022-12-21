<template lang="pug">
AppModal(:is-open="isOpen", @close="close()")
  template(v-slot:content)
    div
      canvas#myChart
</template>

<script setup>
import AppModal from "./AppModal";
import { defineProps, defineEmits, onMounted } from "vue";
import { Chart } from "chart.js/auto";
import { useTimeStore } from "@/store/timer";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

onMounted(() => {
  const timerStore = useTimeStore();
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: timerStore.getTime.length }).fill(""),
      datasets: [
        {
          label: "Your progress",
          data: timerStore.getTime,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
</script>

<style scoped></style>
