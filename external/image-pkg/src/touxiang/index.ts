import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "xjj";

const ApiMap = new Map([
  [1, "http://api.yujn.cn/api/sjtp.php"],
  [2, "http://api.yujn.cn/api/qltx.php?type=json&lx=qltx"],
  [3, "http://api.yujn.cn/api/qltx.php?type=json&lx=tt"],
  [4, "http://www.yujn.cn/api/maomi.php"],
  [5, "http://api.yujn.cn/api/lltx.php"],
]);

const typesMap = new Map([
  ["随机图片", 1],
  ["情侣头像", 2],
  ["套图", 3],
  ["猫咪", 4],
  ["女头", 5],
]);

export function apply(ctx: Context) {
  ctx
    .command("头像 [type:number]")
    .usage(
      "功能说明：获取头像\n参数说明：【type：必填，头像类型，可选值有：1(随机图片)、2(情侣头像)、3(套图)、4(猫咪)、5(女头)】"
    )
    .example("头像 1")
    .action(async ({ session }, type) => {
      if (!type || !Array.from(ApiMap.keys()).includes(type)) {
        // 随机
        type = Array.from(ApiMap.keys())[
          Math.floor(Math.random() * typesMap.size)
        ];
      }
      if (type === 5 || type === 4) {
        return `<img src='${ApiMap.get(type)}' />`;
      } else {
        try {
          const res = await (await fetch(ApiMap.get(type))).json();
          if (res.code !== 200) {
            return "请求失败O.o";
          }
          const data = type === 1 ? res.image_url : res.img;
          if (session.onebot && data.length > 1) {
            await session.onebot._request("send_forward_msg", {
              user_id: session.event.user.id,
              group_id: session.event.guild,
              messages: data.map((item: any) => ({
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
          return "请求失败O.o";
        }
      }
    });
}
