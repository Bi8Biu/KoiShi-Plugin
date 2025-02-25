import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "bqbSearch";

export function apply(ctx: Context) {
  ctx
    .command("搜表情 <keyword:string> [num:number]")
    .usage(
      "功能说明：搜索表情包\n参数说明：【keyword：必选，要搜索的关键词】、【num：可选，要搜索的表情数量，默认5】"
    )
    .example("搜表情 龙图 3")
    .action(async ({ session }, keyword, num) => {
      if (!keyword) {
        return "请输入要搜索的表情";
      }
      try {
        const res = await (
          await fetch(
            `https://api.yujn.cn/api/bbq_ss.php?count=${
              num || 5
            }&msg=${keyword}`
          )
        ).json();

        if (res.code !== 200) {
          if (res.code === 201) return "什么也没有搜到O.o";
          return "请求失败O.o";
        }
        if (session.onebot && res.data.length > 1) {
          await session.onebot._request("send_forward_msg", {
            user_id: session.event.user.id,
            group_id: session.event.guild,
            messages: res.data.map((item: any) => ({
              type: "node",
              data: {
                content: [
                  {
                    type: "image",
                    data: {
                      url: item,
                    },
                  },
                ],
              },
            })),
          });
        } else {
          let msg = "";
          res.data.forEach((item: any) => {
            msg += `<img src="${item}" />`;
          });
          return msg;
        }
      } catch (error) {
        console.error(error);
        return "请求失败O.o";
      }
    });
}
