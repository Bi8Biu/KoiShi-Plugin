import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "search";

export function apply(ctx: Context) {
  ctx
    .command("搜图 <keyword:string> [num:number]")
    .usage(
      "功能说明：搜索图片\n参数说明：【keyword：必填，搜索关键词】、【num：选填，输出数量，默认5】"
    )
    .example("搜图 风景")
    .example("搜图 动漫 3")
    .action(async ({ session }, keyword, num) => {
      try {
        if (!keyword) {
          return "请输入搜索关键词";
        }
        const res = await (
          await fetch(
            `http://api.yujn.cn/api/soutu.php?num=${num || 5}&type=${keyword}`
          )
        ).json();

        if (res.code !== 200) {
          return "请求失败O.o";
        }
        if (res.data.length === 0) {
          return "没有找到相关图片O.o";
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
                      url: item.photo,
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
