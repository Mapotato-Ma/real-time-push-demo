<template>
  <div class="iframe-stream">
    <div class="is-message-count" id="count">0000</div>
    <iframe src="/api/iframe-stream" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { fromEvent } from 'rxjs';

fromEvent(document, 'message').subscribe((message) => {
  console.log('🚀 ~ 接收事件 ~ 13行', message);
});
</script>

<style lang="less" scoped>
.iframe-stream {
  font-size: 100px;
  font-weight: bolder;
  color: rgb(240, 58, 17);
}
</style>
