import { Context } from "koishi";
import { Config } from "../..";
import { getApi } from "../../utils";
export const name = "xjj";

const apiMap = new Map([
  ["随机1", "http://api.yujn.cn/api/zzxjj.php?type=json"],
  ["随机2", "https://api.yujn.cn/api/xjj.php?type=json"],
  ["随机3", "http://api.yujn.cn/api/juhexjj.php?type=json"],
  ["女大", "https://api.yujn.cn/api/nvda.php?type=json"],
  ["萝莉", "http://api.yujn.cn/api/luoli.php?type=json"],
  ["女高", "http://api.yujn.cn/api/nvgao.php?type=json"],
  ["清纯", "http://api.yujn.cn/api/qingchun.php?type=json"],
  ["甜妹", "http://api.yujn.cn/api/tianmei.php?type=json"],
  ["欲梦", "http://api.yujn.cn/api/ndym.php?type=json"],
]);

export function apply(ctx: Context, config: Config) {
  ctx
    .command("小姐姐 [type:string]")
    .usage(
      "功能：随机输出一段小姐姐视频\n参数：【type 类型，不填则随机，可选值：随机1、随机2、随机3、女大、萝莉、女高、清纯、甜妹、欲梦】"
    )
    .example("小姐姐")
    .example("小姐姐 女高")
    .action(async ({ session }, type) => {
      const loadingMsg = await session.send(config.loadingMsg);
      try {
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
