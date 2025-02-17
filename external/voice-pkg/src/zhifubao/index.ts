import { Context } from "koishi";

export const name = "zhifubao";

export function apply(ctx: Context) {
  ctx
    .command("支付宝到账 <money:number>")
    .usage("生成支付宝到账语音")
    .action(async ({ session }, money) => {
      if (money === undefined) {
        return "请输入金额";
      }
      return `<audio src="http://api.yujn.cn/api/zfb.php?msg=${money}" />`;
    });
}
