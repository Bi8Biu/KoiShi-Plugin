import { Context } from "koishi";

export const name = "xhz";

export function apply(ctx: Context) {
  ctx
    .command("小黑子")
    .usage("功能：随机输出一段小黑子音频")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/sjkk.php" />`;
    });
}
