import { Message } from './types';
import { createHmac } from 'crypto';
import { got } from 'got';

/**
 * 请求签名。
 * @param secret 签名密钥。
 */
function makeSign(secret: string): { timestamp: number; sign: string } {
  const hmac = createHmac('sha256', Buffer.from(secret, 'utf-8'));
  const timestamp = Date.now();
  hmac.update(Buffer.from(`${timestamp}\n${secret}`, 'utf-8'));
  const sign = hmac.digest('base64');
  return { timestamp, sign };
}

/**
 * 发送消息。
 * @param message 消息数据。
 */
export async function send(message: Message): Promise<void> {
  const url = 'https://oapi.dingtalk.com/robot/send';
  const params = new URLSearchParams();

  params.set('access_token', message.accessToken);

  if (message.secret) {
    const { sign, timestamp } = makeSign(message.secret);
    params.set('sign', sign);
    params.set('timestamp', String(timestamp));
  }

  const dingMessage: Record<string, unknown> = {};

  const payload = { ...message.payload };

  if ('at' in payload) {
    dingMessage.at = payload.at;
    delete payload.at;
  }

  dingMessage.msgtype = message.type;
  dingMessage[message.type] = payload;

  const resp = await got(url, {
    searchParams: params,
    json: dingMessage,
    method: 'POST',
  });

  const body = JSON.parse(resp.body);

  if (body.errcode !== 0) {
    throw new Error(body.errmsg);
  }
}
