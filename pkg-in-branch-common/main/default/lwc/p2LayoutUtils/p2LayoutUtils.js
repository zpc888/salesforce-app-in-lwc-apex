import { api, LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge, isTrue } from "c/p0Funcs";

import { en, fr } from "./p2LayoutUtils-i18n";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2LayoutUtils extends mix(LightningElement).with(
  MixinLangAware
) {
  enrichedFr = deepMerge(fr, en);
  utilsExpandImg = IMAGES_URL + "/sidepanel-close-right.svg"; // in expanded state, but to show close icon
  utilsCollapseImg = IMAGES_URL + "/sidepanel-open-right.svg";
  utilsExpandSelectedImg = IMAGES_URL + "/sidepanel-close-right-selected.svg";
  utilsCollapseSelectedImg = IMAGES_URL + "/sidepanel-open-right-selected.svg";

  @api status = "expanded"; // expanded | collapsed
  _mouseOverToggle = false;
  #manualCollapse = false;

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get isExpanded() {
    return this.status === "expanded";
  }

  get isCollapsed() {
    return this.status === "collapsed";
  }

  get utilsImage() {
    return this._mouseOverToggle
      ? this.isExpanded
        ? this.utilsExpandSelectedImg
        : this.utilsCollapseSelectedImg
      : this.isExpanded
        ? this.utilsExpandImg
        : this.utilsCollapseImg;
  }

  get utilsAriaLabel() {
    return this.isExpanded
      ? this.i18n.arialLabelToCollapse
      : this.i18n.arialLabelToExpand;
  }

  renderedCallback() {
    this.refs.refUtils.classList.toggle("p-expanded", this.isExpanded);
  }

  handleMouseEnterToggle() {
    this._mouseOverToggle = true;
  }

  handleMouseLeaveToggle() {
    this._mouseOverToggle = false;
  }

  handleToggleClick() {
    if (this.isExpanded) {
      this.#manualCollapse = true;
      this.status = "collapsed";
    } else {
      this.#manualCollapse = false;
      this.status = "expanded";
    }
    this.refs.refUtils.classList.toggle("p-expanded", this.isExpanded);
  }

  @api handleWindowResize(isInitial, toBeCollapsed) {
    if (this.#manualCollapse) {
      // keep-as-is
      return;
    }
    if (toBeCollapsed === this.isCollapsed) {
      // matched already
      return;
    }
    if (toBeCollapsed) {
      this.status = "collapsed";
    } else {
      this.status = "expanded";
    }
    this.refs.refUtils.classList.toggle("p-expanded", this.isExpanded);
  }
}
