import { Context } from "koishi";

export const name = "and";

export function apply(ctx: Context) {
  ctx
    .command("随机配音")
    .usage("功能：随机输出一段阿脑袋配音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/and.php" />`;
    });
}
