import { LightningElement } from "lwc";
import { mix, deepMerge } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

import { adminMenuItems } from "c/p2CoMainMenuFactory";
import { en, fr } from "./p2ProdCatAdm-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2ProdCatAdm extends mix(LightningElement).with(
  MixinPageBase
) {
  adminMenuMaker = adminMenuItems();
  _appAdmImg = IMAGES_URL + "/placeholder-30.svg";
  prodCatImg = IMAGES_URL + "/object-structure.svg";
  enrichedFr = deepMerge(fr, en);
  treeMenuSelectedItem = "productCatalog";

  get mainMenuItems() {
    return this.adminMenuMaker(!this.isLangEnglish, {
      tasks: { productCatalog: true, notified: false }
    });
  }

  get i18n() {
    return !this.isLangEnglish ? this.enrichedFr : en;
  }

  get isAdminProdCat() {
    return this.treeMenuSelectedItem === "productCatalog";
  }

  get isAdminDeposit() {
    return this.treeMenuSelectedItem === "productCatalog.deposit";
  }

  get isAdminLending() {
    return this.treeMenuSelectedItem === "productCatalog.lending";
  }

  get appInfo() {
    return {
      imgUrl: this._appAdmImg,
      clientName: this.i18n.adminAppName,
      attrs: []
    };
  }

  get treeMenuItems() {
    const ret = [
      {
        itemKey: "productCatalog",
        itemText: this.i18n.treeMenuProdCat,
        itemType: "prodCat",
        focusable: true,
        kids: [
          {
            itemKey: "deposit",
            itemText: this.i18n.treeMenuDepositCat,
            itemType: "depositCat",
            isLeaf: true
          },
          {
            itemKey: "lending",
            itemText: this.i18n.treeMenuLendingCat,
            itemType: "lendingCat",
            isLeaf: true
          }
        ]
      }
    ];
    // console.log(">>> treeMenuItems", JSON.stringify(ret, null, 2));
    return ret;
  }

  handleMenuSelect(event) {
    this.treeMenuSelectedItem = event.detail.key;
  }
}
