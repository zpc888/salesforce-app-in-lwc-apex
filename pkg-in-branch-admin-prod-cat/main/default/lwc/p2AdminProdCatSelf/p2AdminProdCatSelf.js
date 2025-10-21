import { LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge, moveArrayItem } from "c/p0Funcs";
import { en, fr } from "./p2AdminProdCatSelf-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2AdminProdCatSelf extends mix(LightningElement).with(
  MixinLangAware
) {
  _prodCatAdmImg = IMAGES_URL + "/placeholder-30.svg";
  moveUpIcon = IMAGES_URL + "/action-move-up.svg";
  moveDownIcon = IMAGES_URL + "/action-move-down.svg";
  editIcon = IMAGES_URL + "/action-edit.svg";

  prodCatIdList = ["lending", "deposit", "card", "digitalService"];
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
    console.log(
      `drag and drop 0: move up clicked for ${event.currentTarget.dataset.prodcatId}`
    );
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
    console.log(`drag and drop 0: Reorder from ${index} to ${newIndex}`);
    const newArr = moveArrayItem(this.prodCatObjects, index, newIndex);
    if (newArr !== this.prodCatObjects) {
      this.prodCatObjects = newArr;
      this.prodCatIdList = this.prodCatObjects.map((obj) => obj.id);
    }
  }

  langCodeChanged(newCode) {
    this.prodCatObjects = this.prodCatIdList.map((id) => {
      return {
        id: id,
        label: this.i18n[id]
      };
    });
  }

  handleDragStart(event) {
    const prodCatId = event.currentTarget?.dataset?.prodcatId;
    console.log(`dnd - handleDragStart: fromProdCatId=${prodCatId}`);
    const fromIndex = this.prodCatObjects.findIndex(
      (obj) => obj.id === prodCatId
    );
    console.log(`dnd - handleDragStart: fromIndex=${fromIndex}`);
    // event.currentTarget.classList.add("p-dnd-dragging");
    event.dataTransfer.setData("text/plain", fromIndex);
    event.dataTransfer.effectAllowed = "move";
  }

  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    // event.currentTarget.classList.add("p-dnd-drag-over");
  }

  handleDragDrop(event) {
    event.preventDefault();
    // event.currentTarget.classList.remove("p-dnd-drag-over");
    const fromIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);
    const prodCatId = event.currentTarget?.dataset?.prodcatId;
    console.log(`dnd - handleDragDrop: toProdCatId=${prodCatId}`);
    const toIndex = this.prodCatObjects.findIndex(
      (obj) => obj.id === prodCatId
    );
    console.log(`dnd - handleDragDrop: from ${fromIndex} to ${toIndex}`);
    const newArr = moveArrayItem(this.prodCatObjects, fromIndex, toIndex);
    if (newArr !== this.prodCatObjects) {
      this.prodCatObjects = newArr;
      this.prodCatIdList = this.prodCatObjects.map((obj) => obj.id);
    }
  }

  handleDragEnd(event) {
    event.preventDefault();
    event.currentTarget.classList.remove("p-dnd-dragging");
    event.currentTarget.classList.remove("p-dnd-drag-over");
  }
}
