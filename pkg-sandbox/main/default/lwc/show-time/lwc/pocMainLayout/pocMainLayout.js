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
      clientName: this.isLangEnglish ? "Business Client Name" : "Nom du client",
      attrs: [
        {
          label: this.isLangEnglish
            ? "Client attribute 1"
            : "Attribut du client 1",
          value: this.isLangEnglish
            ? "Content placeholder 1"
            : "Contenu de remplacement 1"
        },
        {
          label: this.isLangEnglish
            ? "Client attribute 2"
            : "Attribut du client 2",
          value: this.isLangEnglish
            ? "Content placeholder 2"
            : "Contenu de remplacement 2"
        }
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
