<template lang="pug">
teleport(to="body")
  transition(name="fade")
    .modal(v-if="isOpen")
      .modal--backdrop(@click="close")
      .modal--container
        .modal--wrapper
          .modal--close(@click="close")
          slot(name="content")
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount } from "vue";
import useDisableScroll from "@/features/useDisableScroll";

const emit = defineEmits(["close", "submit"]);
const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

function close() {
  emit("close");
}

const keyPress = (event: KeyboardEvent) => {
  if (event && event.code === "Escape") {
    close();
  }
};
useDisableScroll();
document.addEventListener("keydown", keyPress);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyPress);
});
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  &--backdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000000;
    top: 0;
    left: 0;
    opacity: 0.4;
  }

  &--container {
    max-height: 100%;
    overflow-y: auto;
    padding: 10px;
    z-index: 11;
  }

  &--wrapper {
    position: relative;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 10px;
  }

  &--close {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 9;
  }

  &--loader {
    top: calc(50% - 90px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
