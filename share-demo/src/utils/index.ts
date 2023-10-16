import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive<{
  connected: boolean;
  fooEvents: Array<any>;
  barEvents: Array<any>;
}>({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = 'http://localhost:3000/newMessage';

export const socket = io(URL, {
  withCredentials: true,
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('🚀 ~ 链接成功！ ~ 19行');
  state.connected = true;
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('foo', (...args) => {
  state.fooEvents.push(args);
});

socket.on('bar', (...args) => {
  state.barEvents.push(args);
});
