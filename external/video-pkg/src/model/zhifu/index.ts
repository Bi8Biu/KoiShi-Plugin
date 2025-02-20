import { Context, Session } from "koishi";
import { Config } from "../..";
import { getApi } from "../../utils";

export const name = "ZhiFu";
const apiMap = new Map([
  ["白丝", "http://api.yujn.cn/api/baisis.php?type=json"],
  ["黑丝", "http://api.yujn.cn/api/heisis.php?type=json"],
  ["JK", "http://api.yujn.cn/api/jksp.php?type=json"],
  ["变装", "http://api.yujn.cn/api/ksbianzhuang.php?type=json"],
  ["coser", "https://api.yujn.cn/api/manzhan.php?type=json"],
  ["cosplay1", "http://api.yujn.cn/api/sbkl.php?type=json"],
  ["cosplay2", "http://api.yujn.cn/api/manhuay.php?type=json"],
  ["吊带", "http://api.yujn.cn/api/diaodai.php?type=json"],
  ["穿搭", "https://api.yujn.cn/api/chuanda.php?type=json"],
  ["身材", "https://api.yujn.cn/api/wmsc.php?type=json"],
  ["汉服", "http://api.yujn.cn/api/hanfu.php?type=json"],
  ["腿足1", "http://api.yujn.cn/api/jpmt.php?type=json"],
  ["腿足2", "http://api.yujn.cn/api/yuzu.php?type=json"],
]);

export function apply(ctx: Context, config: Config) {
  ctx
    .command("制服 [type:string]")
    .usage(
      "功能：随机输出一段制服系列视频\n参数：【type 类型，不填则随机，可选值：白丝、黑丝、JK、变装、coser、cosplay1、cosplay2、吊带、穿搭、身材、汉服、腿足1、腿足2】"
    )
    .example("制服")
    .example("制服 黑丝")
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
