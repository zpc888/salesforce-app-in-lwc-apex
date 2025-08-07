import { LightningElement } from "lwc";
import { mix } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

export default class PocMainLayout extends mix(LightningElement).with(
  MixinPageBase
) {
  tooManyTreeMenu = false;
  tooManyUtils = false;
  tooManyContents = false;

  handleToggleTreeMenuOverflow() {
    this.tooManyTreeMenu = !this.tooManyTreeMenu;
  }

  handleToggleUtilsOverflow() {
    this.tooManyUtils = !this.tooManyUtils;
  }

  handleToggleContentsOverflow() {
    this.tooManyContents = !this.tooManyContents;
  }

  get toggleSubMenuOverflowOrNot() {
    return this.tooManyTreeMenu ? "Shorten Tree Menu" : "Overflow Tree Menu";
  }

  get toggleUtilsOverflowOrNot() {
    return this.tooManyUtils ? "Shorten" : "Overflow";
  }

  get toggleContentsOverflowOrNot() {
    return this.tooManyContents ? "Shorten" : "Overflow";
  }
}
