import { LightningElement, api } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { en, fr } from "./p2LayoutTimeline-i18n";
import { isNotEmpty, deepMerge, mix } from "c/p0Funcs";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2LayoutTimeline extends mix(LightningElement).with(
  MixinLangAware
) {
  @api title;
  @api items; // see P2LayoutTimelineItem

  headerImage = IMAGES_URL + "/placeholder-30.svg"; // in expanded state, but to show close icon

  #expandImg = IMAGES_URL + "/chevron-up.svg"; // in expanded state, but to show close icon
  #collapseImg = IMAGES_URL + "/chevron-down.svg";

  _collapsed = false;

  #enrichedFr = deepMerge(fr, en);

  get i18n() {
    return this.isFrench() ? this.#enrichedFr : en;
  }

  get image() {
    return this._collapsed ? this.#expandImg : this.#collapseImg;
  }

  get expanded() {
    return !this._collapsed;
  }

  @api get collapsed() {
    return this._collapsed;
  }

  set collapsed(value) {
    this._collapsed = value;
  }

  get hasItems() {
    return this.items && this.items.length > 0;
  }

  get timelineAriaLabel() {
    return this.expanded
      ? this.i18n.ariaLabelToCollapse
      : this.i18n.ariaLabelToExpand;
  }

  handleToggleClick() {
    console.log(
      "P2LayoutTimeline: handleToggleClick collapsed:",
      this._collapsed
    );
    this._collapsed = !this._collapsed;
  }
}
