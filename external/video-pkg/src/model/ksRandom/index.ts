import { Context } from "koishi";
import { Config } from "../..";

export const name = "ksRandom";

export function apply(ctx: Context, config: Config) {
  ctx
    .command("快手随机")
    .usage("功能：随机输出一段快手视频")
    .action(async ({ session }) => {
      const loadingMsg = await session.send(config.loadingMsg);
      try {
        const res = await (
          await fetch("http://api.yujn.cn/api/ks_sj.php?count=1")
        ).json();
        if (res.code === 200) {
          await session.send(`<video src="${res.data[0].video}" />`);
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
