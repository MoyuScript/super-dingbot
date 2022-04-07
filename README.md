# super-dingbot

一个好用的钉钉机器人库（含 CLI）

## 安装

```bash
$ npm install -S super-dingbot

# or

$ yarn add super-dingbot

# or

$ pnpm add super-dingbot
```

## 快速上手

### JS 库

```js
import { send } from 'super-dingbot';

await send({
  accessToken: '机器人 access_token',
  secret: '机器人签名密钥',
  type: 'text',
  payload: {
    content: 'Hello'
  }
});

```

### CLI

**环境变量：**

+ DINGBOT_ACCESS_TOKEN: 机器人 access_token。
+ DINGBOT_SECRET: 机器人签名密钥

## 参考

消息格式参考：<https://open.dingtalk.com/document/group/custom-robot-access>

签名密钥获取方式参考：<https://open.dingtalk.com/document/group/customize-robot-security-settings>
