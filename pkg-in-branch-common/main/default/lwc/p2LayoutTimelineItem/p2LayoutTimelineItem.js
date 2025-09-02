import { LightningElement, api } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";

import { en, fr } from "./p2LayoutTimelineItem-i18n";
import { isNotEmpty, deepMerge, mix } from "c/p0Funcs";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2LayoutTimelineItem extends mix(LightningElement).with(
  MixinLangAware
) {
  @api id;
  @api heading;
  @api dateTime;
  @api operatorName;
  @api operatorId;
  @api comments;
  @api status;

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

  @api get collapsed() {
    return this._collapsed;
  }

  set collapsed(value) {
    this._collapsed = value;
  }

  get expanded() {
    return !this._collapsed;
  }

  get hasComments() {
    return isNotEmpty(this.comments);
  }

  get hasOperator() {
    return isNotEmpty(this.operatorName) || isNotEmpty(this.operatorId);
  }

  get operator() {
    return isNotEmpty(this.operatorName) ? this.operatorName : this.operatorId;
  }

  get hasDateTime() {
    return isNotEmpty(this.dateTime);
  }

  get timelineItemAriaLabel() {
    return this.isExpanded
      ? this.i18n.arialLabelToCollapse
      : this.i18n.arialLabelToExpand;
  }

  renderedCallback() {
    if (this.status === "submit") {
      this.refs.refStatus.style.backgroundColor = "#CEE5FD";
    }
  }

  handleToggleClick() {
    this._collapsed = !this._collapsed;
  }
}
