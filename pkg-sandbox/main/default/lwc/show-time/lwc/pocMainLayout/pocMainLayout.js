import { LightningElement } from "lwc";
import { mix } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class PocMainLayout extends mix(LightningElement).with(
  MixinPageBase
) {
  tooManyTreeMenu = false;
  tooManyUtils = false;
  tooManyContents = false;

  clientImg = IMAGES_URL + "/placeholder-30.svg";

  get appInfo() {
    return {
      imgUrl: this.clientImg,
      clientName: "Business Client Name",
      attrs: [
        { label: "Client attribute 1", value: "Content placeholder 1" },
        { label: "Client attribute 2", value: "Content placeholder 2" }
      ]
    };
  }

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
