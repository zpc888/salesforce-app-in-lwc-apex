import { LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge } from "c/p0Funcs";
import { en, fr } from "./p2AdminProdCatSelf-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2AdminProdCatSelf extends mix(LightningElement).with(
  MixinLangAware
) {
  _prodCatAdmImg = IMAGES_URL + "/placeholder-30.svg";
  moveUpIcon = IMAGES_URL + "/action-move-up.svg";
  moveDownIcon = IMAGES_URL + "/action-move-down.svg";
  editIcon = IMAGES_URL + "/action-edit.svg";

  prodCatIdList = ["lending", "deposit"];
  prodCatObjects = [];

  enrichedFr = deepMerge(fr, en);

  connectedCallback() {
    this.prodCatObjects = this.prodCatIdList.map((id) => {
      return {
        id: id,
        label: this.i18n[id]
      };
    });
  }

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  async handleMoveUpClick(event) {
    this._moveItem(event, -1);
  }

  async handleMoveDownClick(event) {
    this._moveItem(event, +1);
  }

  _moveItem(event, offset) {
    const prodCatId = event.currentTarget?.dataset?.prodcatId;
    const index = this.prodCatObjects.findIndex((obj) => obj.id === prodCatId);
    if (index === -1) {
      return;
    }
    const newIndex = index + offset;
    if (newIndex < 0 || newIndex >= this.prodCatObjects.length) {
      return;
    }
    const item = this.prodCatObjects.splice(index, 1)[0];
    this.prodCatObjects.splice(newIndex, 0, item);
    // trigger re-render
    this.prodCatObjects = [...this.prodCatObjects];
    this.prodCatIdList = this.prodCatObjects.map((obj) => obj.id);
  }

  langCodeChanged(newCode) {
    this.prodCatObjects = this.prodCatIdList.map((id) => {
      return {
        id: id,
        label: this.i18n[id]
      };
    });
  }
}
