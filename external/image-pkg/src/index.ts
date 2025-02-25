import { Context, Schema } from "koishi";
import * as bqbSearch from "./bqbSearch";
import * as longtu from "./longtu";
import * as wallpaper from "./wallpaper";
import * as wallpaperSearch from "./wallpaperSearch";
import * as search from "./search";
import * as pic from "./pic";
import * as touxiang from "./touxiang";
import * as xiaoheizi from "./xiaoheizi";
import * as duitang from "./duitang";
import * as cos from "./cos";
import * as qlyx from "./qlyx";
export const name = "image-pkg";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.plugin(bqbSearch);
  ctx.plugin(longtu);
  ctx.plugin(wallpaper);
  ctx.plugin(wallpaperSearch);
  ctx.plugin(search);
  ctx.plugin(pic);
  ctx.plugin(touxiang);
  ctx.plugin(xiaoheizi);
  ctx.plugin(duitang);
  ctx.plugin(cos);
  ctx.plugin(qlyx);
}
