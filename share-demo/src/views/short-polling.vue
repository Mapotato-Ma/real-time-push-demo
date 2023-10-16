<template>
  <div class="short-polling">
    <button @click="startLoading">开始加载</button>
    <button @click="stopLoading">停止加载</button>
    <div>{{ processText }}</div>
    <progress :value="currentValue" :max="100"></progress>
  </div>
</template>

<script lang="ts" setup>
import { Subject, takeUntil, timer } from 'rxjs';
import { onUnmounted, ref } from 'vue';

const currentValue = ref(0);
const processText = ref('当前的进度为0%');
const destroy$ = new Subject<void>();

const startLoading = () => {
  processText.value = '当前的进度为0%';
  currentValue.value = 0;
  fetch('/api/start');
  timer(1000, 500)
    .pipe(takeUntil(destroy$))
    .subscribe(() => {
      fetch('/api/short').then((res) => {
        res.json().then(({ process, value }) => {
          if (process && value) {
            processText.value = process;
            currentValue.value = value;
            if (currentValue.value >= 100) {
              stopLoading();
            }
          }
        });
      });
    });
};
const stopLoading = () => {
  fetch('/api/stop');
  destroy$.next();
};
onUnmounted(() => {
  destroy$.next();
  destroy$.complete();
});
</script>
