import { Context } from "koishi";

export const name = "sing";

export function apply(ctx: Context) {
  ctx
    .command("唱歌")
    .usage("功能：随机唱一段歌")
    .action(async ({ session }) => {
      let url = `https://api.pearktrue.cn/api/random/changya.php`;
      const res = (await (await fetch(url)).json()) as any;

      if (res.code === 200) {
        const data = res.data;
        return `<audio src="${data.audiosrc}" />`;
      } else {
        return `获取失败，${res.msg}`;
      }
    });
}
