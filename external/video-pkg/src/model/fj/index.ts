import { Context } from "koishi";
import { Config } from "../..";
import { getApi } from "../../utils";

export const name = "fj";

const apiMap = new Map([
  ["风景1", "http://api.yujn.cn/api/haibian.php"],
  ["风景2", "http://api.yujn.cn/api/pcfj.php"],
]);

export function apply(ctx: Context, config: Config) {
  ctx
    .command("风景")
    .usage("功能：随机输出一段风景视频")
    .action(async ({ session }) => {
      const loadingMsg = await session.send(config.loadingMsg);
      await session.send(`<video src="${getApi(apiMap)}" />`);
      if (loadingMsg && config.recall) {
        const tipMsgId = loadingMsg[0];
        session.bot.deleteMessage(session.channelId, tipMsgId);
      }
      return;
    });
}
