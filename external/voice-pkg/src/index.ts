import { Context, Schema } from "koishi";
import * as greenTea from "./greenTea";
import * as scold from "./scold";
import * as sing from "./sing";
import * as jiazi from "./jiazi";
import * as pixiv from "./pixiv";
import * as zhifubao from "./zhifubao";
import * as recite from "./recite";
import * as yskfc from "./yskfc";
export const name = "voice-pkg";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.plugin(greenTea);
  ctx.plugin(scold);
  ctx.plugin(sing);
  ctx.plugin(jiazi);
  ctx.plugin(pixiv);
  ctx.plugin(zhifubao);
  ctx.plugin(recite);
  ctx.plugin(yskfc);
}
