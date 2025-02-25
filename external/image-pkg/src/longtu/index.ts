import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "longtu";

export function apply(ctx: Context) {
  ctx
    .command("龙图")
    .usage("功能说明：随机获取一张龙图")
    .action(async ({ session }) => {
      return "<img src='https://api.yujn.cn/api/long.php?type=image' />";
    });
}
