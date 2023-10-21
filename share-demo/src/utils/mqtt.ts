import type { MqttClient, OnMessageCallback } from 'mqtt';
import mqtt from 'mqtt/dist/mqtt.min';

class MQTT {
  url: string; // mqtt地址
  topic: string; //订阅地址
  client!: MqttClient;
  constructor(topic: string) {
    this.topic = '/nodejs/mqtt-Mapotato';
    // 虽然是mqtt但是在客户端这里必须采用websock的链接方式
    this.url = 'ws://broker.emqx.io:1883/mqtt';
  }

  //初始化mqtt
  init() {
    const host = 'broker.emqx.io';
    const port = '1883';
    const clientId = `mqtt_99251645615616854-2121654556456`;
    const connectUrl = `ws://${host}:${port}/mqtt`;
    this.client = mqtt.connect(connectUrl, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      username: 'emqx',
      password: 'public',
      reconnectPeriod: 1000
    });
    this.client.on('error', (error: any) => {
      console.log(error);
    });
    // this.client.on('reconnect', (error: Error) => {
    //   console.log(error);
    // });
  }
  //取消订阅
  unsubscribes() {
    this.client.unsubscribe(this.topic, (error: Error | undefined) => {
      if (!error) {
        console.log(this.topic, '取消订阅成功');
      } else {
        console.log(this.topic, '取消订阅失败');
      }
    });
  }
  //连接
  link() {
    this.client.on('connect', () => {
      this.client.subscribe(this.topic, (error: any) => {
        if (!error) {
          console.log('订阅成功');
        } else {
          console.log('订阅失败');
        }
      });
    });
  }
  //收到的消息
  get(callback: OnMessageCallback) {
    this.client.on('message', callback);
  }
  //结束链接
  over() {
    this.client.end();
  }
}
export default MQTT;
