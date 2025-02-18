import { Context, Schema } from "koishi";

export const name = "scold";

export interface Config {}

export const Config: Schema<Config> = Schema.object({}).description(
  "扣字骂鲨臂"
);

export function apply(ctx: Context) {
  ctx
    .command("骂 [num:number] [at]")
    .usage("功能说明：骂人")
    .usage("参数说明：num 为骂的次数，默认为1，at 为@要骂的人")
    .example("骂 3 @user  => 骂 @user 3次")
    .action(async ({ session }, num = 1, at) => {
      const apiUrls = [
        "https://api.pearktrue.cn/api/zuan/gd.php",
        "https://api.pearktrue.cn/api/zuan/sk.php",
        "https://api.pearktrue.cn/api/zuan/od.php",
        "https://api.yujn.cn/api/Ridicule.php?msg=5",
      ];

      const msg = at ? at : "";
      for (let i = 0; i < num; i++) {
        const url = apiUrls[Math.floor(Math.random() * apiUrls.length)];
        const res = (await (await fetch(url)).text()) as any;
        session.send(`${msg} ${res}`);
      }
      return "";
    });
}
