import { Context } from "koishi";

export const name = "dj";

export function apply(ctx: Context) {
  ctx
    .command("dj")
    .usage("功能：随机输出一段DJ音频")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/dj.php" />`;
    });
}
