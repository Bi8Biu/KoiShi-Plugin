import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";
import { Config } from "../..";

export const name = "ks";

export function apply(ctx: Context, config: Config) {
  ctx
    .command("快手 <keyword:string> [num:number]")
    .usage(
      "功能说明：搜索快手视频\n参数说明：keyword 搜索关键词，num 搜索数量, 默认1"
    )
    .example("快手 治愈   => 搜索1个治愈视频")
    .example("快手 治愈 3 => 搜索3个治愈视频")
    .action(async ({ session }, keyword, num) => {
      if (!keyword) {
        return "请输入搜索关键词";
      }
      if (!num) num = 1;
      if (num < 1) {
        return "搜索数量不能小于1";
      }
      if (num > 18) {
        return "搜索数量不能大于18";
      }
      const loadingMsg = await session.send(config.loadingMsg);
      try {
        const res = await (
          await fetch(
            `http://api.yujn.cn/api/ks_ss.php?msg=${keyword}&num=${num}`
          )
        ).json();
        if (res.code === 200) {
          if (res.data.length === 0) {
            await session.send(`没有找到相关视频`);
          } else if (res.data.length === 1) {
            await session.send(`<video src="${res.data[0].video}" />`);
          } else {
            // 合并发送
            await session.onebot._request("send_forward_msg", {
              group_id: session.event.guild?.id,
              user_id: session.event.user.id,
              messages: res.data.map((item: any) => ({
                type: "node",
                data: {
                  user_id: session.event.user.id,
                  content: [
                    {
                      type: "video",
                      data: {
                        file: item.video,
                      },
                    },
                  ],
                },
              })),
            });
          }
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
