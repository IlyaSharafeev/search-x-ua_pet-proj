<template lang="pug">
transition(name="fade", mode="out-in")
  router-view
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
