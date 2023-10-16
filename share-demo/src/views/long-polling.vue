<template>
  <div class="short-polling">
    <button @click="startLoading">开始加载</button>
    <div>{{ processText }}</div>
    <progress :value="currentValue" :max="100"></progress>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const currentValue = ref(0);
const processText = ref('当前的进度为0%');
onMounted(() => {});

const startLoading = async () => {
  const { process, value } = await (await fetch('/api/long')).json();
  if (process && value) {
    processText.value = process;
    currentValue.value = value;
  }
  if (currentValue.value <= 90) {
    await startLoading();
  }
};
</script>
