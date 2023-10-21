<template>
  <div class="websocket-demo">{{ count }}</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
const count = ref(0);
const websocket = ref<WebSocket>();
onMounted(() => {
  if ('WebSocket' in window) {
    websocket.value = new WebSocket('ws://127.0.0.1:13000');
    // 打开
    websocket.value.onopen = function () {
      websocket.value?.send('开始获取数据！');
    };
    // 接收
    websocket.value.onmessage = function (e) {
      count.value = e.data;
      console.log('🚀 ~ message ~ 13行', e);
    };
    // 关闭
    websocket.value.onclose = function (e) {
      console.log('🚀 ~ close ~ 13行', e);
    };
    // 连接发生错误的回调方法
    websocket.value.onerror = function (e) {
      console.log('🚀 ~ error ~ 13行', e);
    };
  } else {
    console.log('该浏览器不支持websocket!');
    return;
  }
});

onUnmounted(() => {
  websocket.value?.close();
});
</script>

<style lang="less" scoped>
.websocket-demo {
  font-size: 100px;
  font-weight: bolder;
  color: rgb(240, 58, 17);
}
</style>
