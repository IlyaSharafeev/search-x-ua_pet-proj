<template lang="pug">
teleport(to="body")
  transition(name="fade")
    .modal(v-if="isOpen")
      .modal--backdrop(@click="close")
      .modal--container
        .modal--wrapper
          .modal--close(@click="close")
            svg.bi.bi-x-square(
              xmlns="http://www.w3.org/2000/svg",
              width="16",
              height="16",
              fill="currentColor",
              viewbox="0 0 16 16"
            )
              path(
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              )
              path(
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              )
          slot(name="content")
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount } from "vue";
import useDisableScroll from "@/features/useDisableScroll";

const emit = defineEmits(["close", "submit"]);
defineProps({
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
    top: 5px;
    right: 17px;
    font-size: 18px;
    z-index: 9;
    cursor: pointer;
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
