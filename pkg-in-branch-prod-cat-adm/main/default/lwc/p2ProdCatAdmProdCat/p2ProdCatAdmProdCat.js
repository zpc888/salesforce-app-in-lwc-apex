import { LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge } from "c/p0Funcs";
import { en, fr } from "./p2ProdCatAdmProdCat-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2ProdCatAdmProdCat extends mix(LightningElement).with(
  MixinLangAware
) {
  _prodCatAdmImg = IMAGES_URL + "/placeholder-30.svg";

  enrichedFr = deepMerge(fr, en);

  get i18n() {
    return !this.isLangEnglish ? this.enrichedFr : en;
  }
}
