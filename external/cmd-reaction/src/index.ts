import { Context, Schema } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "cmd-reaction";

export interface Config {
  commandList: string[];
  emojiId?: number;
  // 是否在回复后取消回应
  cancelReaction?: boolean;
}

export const Config: Schema<Config> = Schema.object({
  commandList: Schema.array(Schema.string()).description("生效命令列表"),
  emojiId: Schema.number()
    .step(1)
    .default(424)
    .description(
      "回应表情ID, 默认424, *表情列表请参考 【[表情-CQ-码-ID-表](https://github.com/kyubotics/coolq-http-api/wiki/表情-CQ-码-ID-表)】*"
    ),
}).description("配置选项");

export function apply(ctx: Context, config: Config) {
  ctx.middleware(async (session, next) => {
    const command = session.event.message.elements
      .find((item) => {
        return item.type === "text";
      })
      ?.attrs?.content?.trim()
      .split(" ")[0];

    if (command && config.commandList.includes(command)) {
      await session.onebot._request("set_msg_emoji_like", {
        message_id: session.messageId,
        emoji_id: config.emojiId || 424,
        set: true,
      });
    }
    return next();
  }, true);
}
