import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";
export const name = "dialect";

export function apply(ctx: Context) {
  ctx
    .command("方言")
    .usage("功能：随机输出一段方言语音")
    .action(async ({ session }) => {
      let url = `http://api.yujn.cn/api/xiangyin.php`;
      try {
        const res = (await (await fetch(url)).json()) as any;
        const data = res.voices;
        // 合并发送
        await session.send(`<audio src="${data[0].mp3_url}" />`);
      } catch (e) {
        console.error(e);
        await session.send("请求失败");
      }
      return;
    });
}
