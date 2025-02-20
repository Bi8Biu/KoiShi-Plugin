import { Context } from "koishi";
import { Config } from "../..";
import { getApi } from "../../utils";

export const name = "fc";
const apiMap = new Map([
  ["快手", "http://api.yujn.cn/api/ks_fc.php?type=json"],
  ["懒羊羊", "http://api.yujn.cn/api/lyy.php?type=json"],
  ["小新", "http://api.yujn.cn/api/xiaoxin.php?type=json"],
]);

export function apply(ctx: Context, config: Config) {
  ctx
    .command("翻唱 [type:string]")
    .usage(
      "功能：随机输出一段翻唱系列视频\n参数：【type：翻唱源，不填则随机，可选值：快手、懒羊羊、小新】"
    )
    .example("翻唱")
    .example("翻唱 懒羊羊")
    .action(async ({ session }, type) => {
      const loadingMsg = await session.send(config.loadingMsg);
      try {
        // 发请求
        const res = await (await fetch(getApi(apiMap, type))).json();
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
