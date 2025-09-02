import { LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge } from "c/p0Funcs";

import { en, fr } from "./p2LayoutContent-i18n";
// import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2LayoutContent extends mix(LightningElement).with(
  MixinLangAware
) {
  enrichedFr = deepMerge(fr, en);

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }
}
