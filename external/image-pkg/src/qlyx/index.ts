import { Context } from "koishi";

export const name = "qlyx";

export function apply(ctx: Context) {
  ctx.command("qlyx").usage(
    "功能说明：获取图片-葫芦侠图源（清凉一夏模块）"
  )
  .example("qlyx")
  .action(action);
}

async function action ({ session }) {
  try {

    const res = await (
      await fetch(
        `https://api.yujn.cn/api/qlyx.php?type=json`
      )
    ).json();

    if (res.code !== 200) {
      return "请求失败O.o";
    }
    if (!res.img || res.img.length === 0 || !res.img[0]) {
      // console.log("资源失效，重新请求O.o");
      await action({ session });
      return;
    }
    if (session.onebot && res.img.length > 1) {
      await session.onebot._request("send_forward_msg", {
        user_id: session.event.user.id,
        group_id: session.event.guild,
        messages: res.img.map((item: any) => ({
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
      res.img.forEach((item: any) => {
        msg += `<img src="${item}" />`;
      });
      return msg;
    }
  } catch (error) {
    console.error(error);
    return "请求失败O.o";
  }
}
