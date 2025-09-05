import { LightningElement, api } from "lwc";

import { isTrue } from "c/p0Funcs";

export default class P2LayoutMainMenuItem extends LightningElement {
  @api item;
  // name: string, label: string,
  // selected: boolean, notified: boolean,
  // img: string, selectedImg: string,
  @api mouseOverItemName;

  get image() {
    return isTrue(this.item.selected) ||
      this.mouseOverItemName === this.item.name
      ? this.item.selectedImg
      : this.item.img;
  }
}
