import { Context } from "koishi";
import { Config } from "../..";

export const name = "dm";

export function apply(ctx: Context, config: Config) {
  ctx
    .command("动漫")
    .usage("功能：随机输出一段动漫视频")
    .action(async ({ session }) => {
      const loadingMsg = await session.send(config.loadingMsg);
      await session.send(`<video src="http://api.yujn.cn/api/dmsp.php" />`);
      if (loadingMsg && config.recall) {
        const tipMsgId = loadingMsg[0];
        session.bot.deleteMessage(session.channelId, tipMsgId);
      }
      return;
    });
}
