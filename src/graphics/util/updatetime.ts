import { computed, onMounted, ref } from 'vue';

export default function getSeconds() {
  const date = ref(new Date());
  const seconds = computed(() => date.value.getSeconds());

  function updateTime() {
    date.value = new Date();
    // console.log(date.value.getSeconds());
  }

  onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
  });

  return seconds;
}
