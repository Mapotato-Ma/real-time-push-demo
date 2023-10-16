<template>
  <div class="server-send-event-demo">
    <div>{{ processText }}</div>
    <progress :value="currentValue" :max="100"></progress>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const currentValue = ref(0);
const processText = ref('当前的进度为0%');
onMounted(() => {
  const evtSource = new EventSource('/api/sse');
  evtSource.onmessage = ({ data }) => {
    const { process, value } = JSON.parse(data);
    processText.value = process;
    currentValue.value = value;
  };
});
</script>

<style scoped lang="less">
progress {
  width: 800px;
  height: 50px;
}
</style>
