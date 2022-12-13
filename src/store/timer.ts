import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTimeStore = defineStore("timeStore", () => {
  const time = ref();

  const addTime = async (secondsArray: string) => {
    time.value = secondsArray;
  };

  const getTime = computed(() => {
    return time.value;
  });

  return {
    time,
    addTime,
    getTime,
  };
});
