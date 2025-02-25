import { Context } from "koishi";

export const name = "cos";

export function apply(ctx: Context) {
  ctx.command("cos").usage(
    "功能说明：获取cos图片-葫芦侠图源"
  )
  .example("cos")
  .action(action);
}
async function action ({ session }) {
  try {

    const res = await (
      await fetch(
        `https://api.yujn.cn/api/cosplay.php?type=json`
      )
    ).json();

    if (res.code !== 200) {
      return "请求失败O.o";
    }
    if (res.data.images.length === 0) {
      await action({ session });
      return;
    }
    if (session.onebot && res.data.images.length > 1) {
      await session.onebot._request("send_forward_msg", {
        user_id: session.event.user.id,
        group_id: session.event.guild,
        messages: res.data.images.map((item: any) => ({
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
}
