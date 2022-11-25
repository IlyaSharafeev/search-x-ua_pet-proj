import { onBeforeUnmount, onMounted } from "vue";

export default function (): void {
  onMounted(() => {
    document.body.classList.add("no-scroll");
  });
  onBeforeUnmount(() => {
    document.body.classList.remove("no-scroll");
  });
}
