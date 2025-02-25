import { Context } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "pic";

const ApisMap = new Map([
  [1, " http://api.yujn.cn/api/mc.php"],
  [2, "http://api.yujn.cn/api/xianhua.php"],
  [3, "http://api.yujn.cn/api/fujiimg.php"],
  [4, "http://api.yujn.cn/api/fujiimg.php"],
  [5, "http://api.yujn.cn/api/xjjtp.php"],
  [6, "http://api.yujn.cn/api/ksxjj.php"],
  [7, "http://api.yujn.cn/api/ACG.php"],
  [8, "http://api.yujn.cn/api/ACG.php"],
  [9, "http://api.yujn.cn/api/ecy.php"],
  [10, "http://api.yujn.cn/api/ACG.php"],
  [11, "https://api.yujn.cn/api/gzl_ACG.php?type=image&form=pc"],
  [12, "https://api.yujn.cn/api/gzl_ACG.php?type=image&form=pe"],
  [13, "https://api.yujn.cn/api/gzl_ACG.php?type=image&form=头像"],
  [14, "https://api.yujn.cn/api/gzl_ACG.php?type=image&form=风景"],
  [15, "https://api.yujn.cn/api/gzl_ACG.php?type=image&form=ai"],
  [16, "http://api.yujn.cn/api/heisi.php"],
  [17, "http://api.yujn.cn/api/heisi.php"],
  [18, "http://api.yujn.cn/api/mjx.php"],
  [19, "http://api.yujn.cn/api/yangyan.php"],
  [20, "http://api.yujn.cn/api/cos.php"],
  [21, "http://api.yujn.cn/api/yht.php?type=image"],
]);

const typesMap = new Map([
  ["萌宠", 1],
  ["花", 2],
  ["腹肌", 3],
  ["动漫风景", 4],
  ["随机女图1", 5],
  ["随机女图2", 6],
  ["电脑壁纸", 7],
  ["手机壁纸", 8],
  ["二次元", 9],
  ["ACG", 10],
  ["ACG-PC", 11],
  ["ACG-手机", 12],
  ["ACG-头像", 13],
  ["ACG-风景", 14],
  ["ACG-AI", 15],
  ["黑丝", 16],
  ["白丝", 17],
  ["买家秀", 18],
  ["养眼", 19],
  ["cos", 20],
  ["r16", 21],
]);

export function apply(ctx: Context) {
  ctx
    .command("pic [type:number]")
    .usage(
      "功能说明：获取图片\n参数说明：【type：必填，图片类型，可选值有：1(萌宠)、2(花)、3(腹肌)、4(动漫风景)、5(随机女图1)、6(随机女图2)、7(电脑壁纸)、8(手机壁纸)、9(二次元)、10(ACG)、11(ACG-PC)、12(ACG-手机)、13(ACG-头像)、14(ACG-风景)、15(ACG-AI)、16(黑丝)、17(白丝)、18(买家秀)、19(养眼)、20(cos)】"
    )
    .example("pic 1")
    .action(async ({ session }, type) => {
      if (!type || !Array.from(ApisMap.keys()).includes(type)) {
        // 随机
        type = Array.from(ApisMap.keys())[
          Math.floor(Math.random() * ApisMap.size)
        ];
      }
      return `<img src='${ApisMap.get(type)}' />`;
    })
}
