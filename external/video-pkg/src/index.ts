import { Context, Schema } from "koishi";
import * as xjj from "./model/xjj";
import * as ks from "./model/ks";
import * as ksRandom from "./model/ksRandom";
import * as dy from "./model/dy";
import * as dance from "./model/dance";
import * as mw from "./model/mw";
import * as fc from "./model/fc";
import * as fj from "./model/fj";
import * as dm from "./model/dm";
import * as zhifu from "./model/zhifu";

export const name = "video-pkg";

export interface Config {
  loadingMsg: string;
  recall: boolean;
}

export const Config: Schema<Config> = Schema.object({
  loadingMsg: Schema.string().default("客官请稍等~").description("加载中提示"),
  recall: Schema.boolean()
    .default(true)
    .description("是否在发送视频后撤回加载提示"),
});

export function apply(ctx: Context, config: Config) {
  ctx.plugin(xjj, config);
  ctx.plugin(ks, config);
  ctx.plugin(ksRandom, config);
  ctx.plugin(dy, config);
  ctx.plugin(mw, config);
  ctx.plugin(fc, config);
  ctx.plugin(dance, config);
  ctx.plugin(fj, config);
  ctx.plugin(dm, config);
  ctx.plugin(zhifu, config);
}
