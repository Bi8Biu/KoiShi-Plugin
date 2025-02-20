import { Context } from "koishi";

export const name = "sajiao";

export function apply(ctx: Context) {
  ctx
    .command("夹子")
    .usage("功能：随机输出一段夹子语音")
    .action(async ({ session }) => {
      return `<audio src="http://api.yujn.cn/api/yujie.php" />`;
    });
}
