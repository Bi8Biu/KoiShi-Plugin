import { Context } from "koishi";

export const name = "pixiv";

export function apply(ctx: Context) {
  ctx
    .command("二次元语音")
    .usage("随机输出一段二次元语音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/maren.php" />`;
    });
}
