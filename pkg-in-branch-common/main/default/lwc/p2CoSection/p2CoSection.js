import { LightningElement, api } from "lwc";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

import { isNotEmpty, mix, deepMerge } from "c/p0Funcs";
import { MixinLangAware } from "c/p0WidgetMixin";
import { en, fr } from "./p2CoSection-i18n";

export default class P2CoSection extends mix(LightningElement).with(
  MixinLangAware
) {
  @api sectionTitle;
  @api sectionSubtitle;
  @api toggleState = "expanded"; // "expanded" or "collapsed" or "none" = not allowed

  _toExpandedIconUrl = `${IMAGES_URL}/chevron-down.svg`;
  _toCollapsedIconUrl = `${IMAGES_URL}/chevron-up.svg`;
  sectionHeaderIcon = `${IMAGES_URL}/action-list.svg`;

  enrichedFr = deepMerge(fr, en);

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get toggleIcon() {
    return this.isExpanded ? this._toCollapsedIconUrl : this._toExpandedIconUrl;
  }

  get toggleAriaLabel() {
    return this.isExpanded
      ? this.i18n.collapseSectionAriaLabel
      : this.i18n.expandSectionAriaLabel;
  }

  get hasSubtitle() {
    return isNotEmpty(this.sectionSubtitle);
  }

  get isExpanded() {
    return this.toggleState === "expanded";
  }

  get isCollapsed() {
    return this.toggleState === "collapsed";
  }

  get hasToggle() {
    return this.toggleState !== "none";
  }

  get isBodyVisible() {
    // expanded or none (no toggle at all)
    return this.toggleState !== "collapsed";
  }

  toggleSection() {
    if (this.toggleState === "expanded") {
      this.toggleState = "collapsed";
    } else if (this.toggleState === "collapsed") {
      this.toggleState = "expanded";
    }
  }
}
