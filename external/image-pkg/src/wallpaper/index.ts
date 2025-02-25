import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "bqbSearch";

const typesMap = new Map([
  ["4K专区", 36],
  ["美女模特", 6],
  ["爱情美图", 30],
  ["风景大片", 9],
  ["小清新", 15],
  ["动漫卡通", 26],
  ["明星风尚", 11],
  ["萌宠动物", 14],
  ["游戏壁纸", 5],
  ["汽车天下", 12],
  ["炫酷时尚", 10],
  ["月历壁纸", 29],
  ["影视剧照", 7],
  ["节日美图", 13],
  ["军事天地", 22],
  ["劲爆体育", 16],
  ["BABY秀", 18],
  ["文字控", 35],
]);

export function apply(ctx: Context) {
  ctx
    .command("壁纸 [type:number] [num:number]")
    .usage(
      "功能说明：获取4K壁纸\n参数说明：【type：可选，壁纸类型序号，不传则随机，可选值有：36(4K专区)、6(美女模特)、30(爱情美图)、9(风景大片)、15(小清新)、26(动漫卡通)、11(明星风尚)、14(萌宠动物)、5(游戏壁纸)、12(汽车天下)、10(炫酷时尚)、29(月历壁纸)、7(影视剧照)、13(节日美图)、22(军事天地)、16(劲爆体育)、18(BABY秀)、35(文字控)】、【num：可选，输出数量，默认1】"
    )
    .example("壁纸")
    .example("壁纸 36 3")
    .action(async ({ session }, type, num) => {
      if (!type || !Array.from(typesMap.values()).includes(type)) {
        // 随机
        type = Array.from(typesMap.values())[
          Math.floor(Math.random() * typesMap.size)
        ];
      }
      try {
        const res = await (
          await fetch(
            `http://api.yujn.cn/api/4k.php?count=${
              num || 1
            }&type=json&id=${type}`
          )
        ).json();

        if (res.code !== 200) {
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
