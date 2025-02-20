import { Context } from "koishi";
import { Config } from "../..";
import { getApi } from "../../utils";
export const name = "dance";

const apiMap = new Map([
  ["热舞1", "http://api.yujn.cn/api/rewu.php?type=json"],
  ["热舞2", "http://api.yujn.cn/api/shwd.php?type=json"],
  ["慢摇", "http://api.yujn.cn/api/manyao.php?type=json"],
]);

export function apply(ctx: Context, config: Config) {
  ctx
    .command("舞蹈 [type:string]")
    .usage(
      "功能：随机输出一段舞蹈视频\n参数：【type 类型，不填则随机：热舞1、热舞2、慢摇】"
    )
    .example("舞蹈")
    .example("舞蹈 慢摇")
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
