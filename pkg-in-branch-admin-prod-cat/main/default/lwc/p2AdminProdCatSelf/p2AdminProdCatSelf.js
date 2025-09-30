import { LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge } from "c/p0Funcs";
import { en, fr } from "./p2AdminProdCatSelf-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2AdminProdCatSelf extends mix(LightningElement).with(
  MixinLangAware
) {
  _prodCatAdmImg = IMAGES_URL + "/placeholder-30.svg";
  moveUpIcon = IMAGES_URL + "/action-move-up.svg";
  moveDownIcon = IMAGES_URL + "/action-move-down.svg";
  editIcon = IMAGES_URL + "/action-edit.svg";

  enrichedFr = deepMerge(fr, en);

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }
}
