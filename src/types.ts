/**
 * 消息格式参考：https://open.dingtalk.com/document/group/custom-robot-access
 */

/**
 * 消息类型
 */
interface BaseMessage<T, P> {
  /**
   * 消息类型
   */
  type: T;
  /**
   * 钉钉设置机器人界面 Webhook 地址后面的查询参数的值，例如：
   *
   * https://oapi.dingtalk.com/robot/send?access_token=abcdef
   *
   * accessToken 为 `abcdef`。
   */
  accessToken: string;
  /**
   * 钉钉设置机器人勾选加签后，需要填入，以 `SEC` 开头。
   */
  secret?: `SEC${string}`;
  /**
   * 消息内容。
   */
  payload: P;
}

export interface AtInterface {
  /**
   * 被 @ 人的手机号。
   */
  atMobiles?: string[];
  /**
   * 被 @ 人的用户 userId（即钉钉号）。
   */
  atUserIds?: string[];
  /**
   * 是否 @ 所有人。
   */
  isAtAll?: boolean;
}

/**
 * 文本类型消息。
 */
export type TextMessage = BaseMessage<
  'text',
  {
    /**
     * @ 信息设置。
     */
    at?: AtInterface;
    /**
     * 文本内容。
     */
    content: string;
  }
>;

/**
 * 链接消息类型。
 */
export type LinkMessage = BaseMessage<
  'link',
  {
    /**
     * 链接标题。
     */
    title: string;
    /**
     * 消息内容。如果太长只会部分展示。
     */
    text: string;
    /**
     * 点击消息跳转的 URL。
     */
    messageUrl: string;
    /**
     * 图片 URL。
     */
    picUrl?: string;
  }
>;

/**
 * Markdown 消息类型。
 */
export type MarkdownMessage = BaseMessage<
  'markdown',
  {
    /**
     * 钉钉消息列表展示内容。
     */
    title: string;
    /**
     * Markdown 内容
     */
    text: string;
    /**
     * @ 信息设置。
     */
    at?: AtInterface;
  }
>;

interface ActionCardMessagePayloadBase {
  /**
   * 钉钉消息列表展示内容。
   */
  title: string;
  /**
   * Markdown 内容。
   */
  text: string;
}

interface ActionCardMessageSingleButton extends ActionCardMessagePayloadBase {
  /**
   * 单个按钮标题。同时设置 `singleURL` 后，`btns` 属性无效。
   */
  singleTitle: string;
  /**
   * 单个点击消息跳转的 URL。
   */
  singleURL: string;
}

interface ActionCardMessageMultipleButton extends ActionCardMessagePayloadBase {
  /**
   * 多个按钮。
   */
  btns: {
    /**
     * 按钮标题。
     */
    title: string;
    /**
     * 按钮跳转 URL。
     */
    actionURL: string;
  }[];
  /**
   * 多个按钮排列方式
   * + `"0"`: 按钮竖直排列。
   * + `"1"`: 按钮横向排列。
   */
  btnOrientation?: '0' | '1';
}

/**
 * 交互卡片消息类型
 */
export type ActionCardMessage = BaseMessage<
  'actionCard',
  ActionCardMessageMultipleButton | ActionCardMessageSingleButton
>;

/**
 * 订阅消息类型
 */
export type FeedCardMessage = BaseMessage<
  'feedCard',
  {
    /**
     * 消息标题。
     */
    title: string;
    /**
     * 消息跳转 URL。
     */
    messageURL: string;
    /**
     * 消息图片 URL。
     */
    picURL: string;
  }[]
>;

/**
 * 消息类型
 */
export type Message =
  | TextMessage
  | LinkMessage
  | MarkdownMessage
  | ActionCardMessage
  | FeedCardMessage;
