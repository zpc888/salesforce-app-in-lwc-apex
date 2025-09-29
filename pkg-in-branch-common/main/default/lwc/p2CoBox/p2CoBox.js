import { LightningElement, api } from "lwc";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

import { mix } from "c/p0Funcs";
import { MixinLangAware } from "c/p0WidgetMixin";

export default class P2CoBox extends mix(LightningElement).with(
  MixinLangAware
) {
  @api boxTitle;

  boxHeaderIcon = `${IMAGES_URL}/action-move.svg`;
}
