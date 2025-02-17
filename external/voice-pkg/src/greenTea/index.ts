import { Context } from "koishi";

export const name = "greenTea";

export function apply(ctx: Context) {
  ctx
    .command("绿茶")
    .usage("随机输出一段绿茶语音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/lvcha.php" />`;
    });
}
