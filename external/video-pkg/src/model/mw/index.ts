import { Context } from "koishi";
import { Config } from "../..";

export const name = "mw";

export function apply(ctx: Context, config: Config) {
  ctx
    .command("萌娃")
    .usage("功能：随机输出一段萌娃系列视频")
    .action(async ({ session }) => {
      const loadingMsg = await session.send(config.loadingMsg);
      try {
        // 发请求
        const res = await (
          await fetch("http://api.yujn.cn/api/mengwa.php?type=json")
        ).json();
        if (res.code === 200) {
          await session.send(`<video src="${res.data}" />`);
        }
      } catch (error) {
        console.error(error);
        await session.send("获取失败");
      }
      if (loadingMsg && config.recall) {
        const tipMsgId = loadingMsg[0];
        session.bot.deleteMessage(session.channelId, tipMsgId);
      }
      return;
    });
}
