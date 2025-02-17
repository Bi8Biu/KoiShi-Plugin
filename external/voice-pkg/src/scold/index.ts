import { Context } from "koishi";

export const name = "scold";

export function apply(ctx: Context) {
  ctx
    .command("骂我")
    .usage("随机输出一段骂人语音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/duiren.php" />`;
    });
}
