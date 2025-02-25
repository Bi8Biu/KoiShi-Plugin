import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "search";

export function apply(ctx: Context) {
  ctx
    .command("堆糖 <keyword:string>")
    .usage("功能说明：从堆糖搜索图片\n参数说明：【keyword：必填，搜索关键词】")
    .example("堆糖 头像")
    .action(async ({ session }, keyword) => {
      if (!keyword) {
        return "请输入搜索关键词";
      }
      return `<img src='http://api.yujn.cn/api/duitang.php?type=image&msg=${keyword}' />`;
    });
}
