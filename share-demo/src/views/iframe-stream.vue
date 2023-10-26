<template>
  <div class="iframe-stream">
    <div>{{ count }}</div>
    <iframe src="/api/iframe-stream" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { fromEvent } from 'rxjs';
import { ref } from 'vue';
const count = ref(0);
fromEvent<{ data: number }>(window, 'message').subscribe((message) => {
  count.value = message.data;
});
</script>

<style lang="less" scoped>
.iframe-stream {
  font-size: 100px;
  font-weight: bolder;
  color: rgb(240, 58, 17);
}
</style>
