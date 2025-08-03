import { api, LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge, isTrue } from "c/p0Funcs";

import { en, fr } from "./p2LayoutSubMenu-i18n";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2LayoutSubMenu extends mix(LightningElement).with(
  MixinLangAware
) {
  enrichedFr = deepMerge(fr, en);
  subMenuExpandImg = IMAGES_URL + "/sidepanel-close-left.svg"; // in expanded state, but to show close icon
  subMenuCollapseImg = IMAGES_URL + "/sidepanel-open-left.svg";
  subMenuExpandSelectedImg = IMAGES_URL + "/sidepanel-close-left-selected.svg";
  subMenuCollapseSelectedImg = IMAGES_URL + "/sidepanel-open-left-selected.svg";

  @api status = "expanded"; // expanded | collapsed
  _mouseOverToggle = false;

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get isExpanded() {
    return this.status === "expanded";
  }

  get isCollapsed() {
    return this.status === "collapsed";
  }

  get subMenuImage() {
    return this._mouseOverToggle
      ? this.isExpanded
        ? this.subMenuExpandSelectedImg
        : this.subMenuCollapseSelectedImg
      : this.isExpanded
        ? this.subMenuExpandImg
        : this.subMenuCollapseImg;
  }

  get subMenuAriaLabel() {
    return this.isExpanded
      ? this.i18n.arialLabelToCollapse
      : this.i18n.arialLabelToExpand;
  }

  handleMouseEnterToggle() {
    this._mouseOverToggle = true;
  }

  handleMouseLeaveToggle() {
    this._mouseOverToggle = false;
  }

  handleToggleClick() {
    if (this.isExpanded) {
      this.status = "collapsed";
      this.refs.refSubMenuTopLeft.style.display = "none";
      this.refs.refSubMenuContent.style.display = "none";
    } else {
      this.status = "expanded";
      this.refs.refSubMenuTopLeft.style.display = "flex";
      this.refs.refSubMenuContent.style.display = "flex";
    }
  }
}
