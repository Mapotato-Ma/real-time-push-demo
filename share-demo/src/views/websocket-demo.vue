<template>
  <div>
    <div>
      <input v-model="chatList.value" />
      <button @click="handleClick()" style="margin-left: 12px">发送</button>

      <div>
        <ul>
          <li v-for="(item, index) in chatList.list" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, onUnmounted, reactive } from 'vue';
import { socket } from '@/utils';
const chatList = reactive<{
  value: string;
  list: Array<any>;
}>({
  value: '',
  list: []
});

// 组件挂载前让socket连接起来
onBeforeMount(() => {
  socket.connect();
});

// 组件挂载完毕完成后，监听onMessage事件
onMounted(() => {
  socket.on('onMessage', (e) => {
    console.log(e);
    chatList.list.push(e.content);
  });
});

// 组件销毁时断开连接
onUnmounted(() => {
  socket.disconnect();
});

// 点击btn发送socket消息
const handleClick = () => {
  socket.emit('newMessage', chatList.value, (e: any) => {
    console.log(e);
  });
};
</script>

<style lang="less" scoped></style>
