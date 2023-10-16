<template>
  <div class="server-send-event-demo">
    <div>{{ processText }}</div>
    <progress :value="currentValue" :max="100"></progress>
  </div>
</template>

<script lang="ts" setup>
import { fromEvent } from 'rxjs';
import { onMounted, ref } from 'vue';
const currentValue = ref(0);
const processText = ref('当前的进度为0%');
onMounted(() => {
  // 创建消息推送通道
  const eventSource = new EventSource('/api/sse');
  // 监听消息推送
  fromEvent<{ data: string }>(eventSource, 'message').subscribe(({ data }) => {
    const { process, value } = JSON.parse(data);
    processText.value = process;
    currentValue.value = value;
  });

  eventSource.onopen = (open) => {
    console.log('🚀 ~ 消息通道打开 ~ 17行', open);
  };

  eventSource.onerror = (error) => {
    console.log('🚀 ~ 错误 ~ 17行', error);
    eventSource.close();
  };
});
</script>

<style scoped lang="less">
progress {
  width: 800px;
  height: 50px;
}
</style>
