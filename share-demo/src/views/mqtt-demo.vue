<template>
  <div class="mqtt-demo">
    <button @click="publish('server')">服务端</button>
    <button @click="publish('client')">客户端</button>
    <button @click="cleanMessage">清空消息队列</button>
    <h3>消息列表</h3>
    <TransitionGroup name="md-message-list">
      <div class="md-message" v-for="(message, index) in messageList" :key="index">
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import mqtt from 'mqtt/dist/mqtt.min.js';
import { ref } from 'vue';

// 消息队列
const messageList = ref<Array<string>>([]);

// 连接选项
const options = {
  clean: false, // true: 清除会话, false: 保留会话
  connectTimeout: 1000000000, // 超时时间
  // 认证信息
  clientId: 'emqx_test',
  username: 'emqx_test',
  password: 'emqx_test'
};

const topic = '/topic1';

const connectUrl = 'ws://broker.emqx.io:8083/mqtt';
const client = mqtt.connect(connectUrl, options);

client.on('connect', () => {
  client.subscribe(topic, (err: unknown) => {
    if (!err) {
      client.publish(topic, '测试连接');
    }
  });
});

client.on('message', (topic: string, message: string) => {
  messageList.value.push(`🚀 ~ ${topic} 主题收到消息: "${message}" ~ `);
});

const publish = (from: 'server' | 'client') => {
  if (from === 'server') {
    client.publish(
      topic,
      `我是服务端 ${Math.round(Math.random() * 10 ** Math.round(Math.random() * 10))}`
    );
  } else {
    client.publish(
      topic,
      `我是客户端 ${Math.round(Math.random() * 10 ** Math.round(Math.random() * 10))}`
    );
  }
};

const cleanMessage = () => (messageList.value = []);
</script>

<style lang="less" scoped>
.md-message-list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>
