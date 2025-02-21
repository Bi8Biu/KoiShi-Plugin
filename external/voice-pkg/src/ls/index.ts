import { Context } from "koishi";

export const name = "ls";

export function apply(ctx: Context) {
  ctx
    .command("铃声 [type:string]")
    .usage(
      "功能说明：随机输出一段铃声\n参数说明：【type: 可选，默认最热，可选值: 最热、最新、搞笑、情感、来电、流行】"
    )
    .action(async ({ session }, type) => {
      return `<audio src="https://api.yujn.cn/api/lsdd.php?msg=${
        type || "最热"
      }&type=mp3" />`;
    });
}
