import { Context } from "koishi";

export const name = "recite";

export function apply(ctx: Context) {
  ctx
    .command("念 <text:string>")
    .usage("功能：念一段文字")
    .example("念 你好")
    .action(async ({ session }, text) => {
      if (!text.trim()) {
        return "请输入文字";
      }
      return `<audio src="http://api.yujn.cn/api/wzzyy.php?msg=${text}" />`;
    });
}
