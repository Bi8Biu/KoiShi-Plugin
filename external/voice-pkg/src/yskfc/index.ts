import { Context } from "koishi";

export const name = "kfc";

export function apply(ctx: Context) {
  ctx
    .command("原神KFC", "原神kfc")
    .usage("随机输出一段原神KFC语音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/yskfc.php" />`;
    });
}
