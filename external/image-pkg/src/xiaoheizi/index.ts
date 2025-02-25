import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "xiaoheizi";

export function apply(ctx: Context) {
  ctx
    .command("小黑子")
    .usage("功能说明：随机获取一张小黑子表情包")
    .action(async ({ session }) => {
      return "<img src='http://api.yujn.cn/api/cxk.php?' />";
    });
}
