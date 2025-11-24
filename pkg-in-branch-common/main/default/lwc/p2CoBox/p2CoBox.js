import { LightningElement, api } from "lwc";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

import { mix, deepMerge } from "c/p0Funcs";
import { MixinLangAware } from "c/p0WidgetMixin";
import { en, fr } from "./p2CoBox-i18n";

export default class P2CoBox extends mix(LightningElement).with(
  MixinLangAware
) {
  @api boxTitle;

  _toggleState = "none"; // "expanded" or "collapsed" or "none" = not allowed

  enrichedFr = deepMerge(fr, en);

  boxHeaderIcon = `${IMAGES_URL}/action-move.svg`;
  _toExpandedIconUrl = `${IMAGES_URL}/chevron-up.svg`;
  _toCollapsedIconUrl = `${IMAGES_URL}/chevron-down.svg`;

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  @api
  get toggleState() {
    return this._toggleState;
  }

  set toggleState(value) {
    if (value === "collapsed" || value === "expanded") {
      this._toggleState = value;
    }
  }

  get isToggleable() {
    return this._toggleState !== "none";
  }

  get isExpanded() {
    return this._toggleState === "expanded";
  }

  get toggleIcon() {
    return this.isExpanded ? this._toCollapsedIconUrl : this._toExpandedIconUrl;
  }

  get toggleAriaLabel() {
    return this.isExpanded
      ? this.i18n.collapseBoxAriaLabel
      : this.i18n.expandBoxAriaLabel;
  }

  async handleToggle() {
    this._toggleState = this.isExpanded ? "collapsed" : "expanded";
  }
}
