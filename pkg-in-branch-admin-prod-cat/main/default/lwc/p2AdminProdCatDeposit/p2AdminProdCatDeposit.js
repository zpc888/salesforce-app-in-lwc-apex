import { api, LightningElement } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { MixinMainBodyBase } from "c/p2WidgetMixin";
import { mix, deepMerge, moveArrayItem } from "c/p0Funcs";
import getDepositLevelProductCatalogues from "@salesforce/apex/PbProductCatalogueAdminController.getDepositLevelProductCatalogues";
import updateDepositLevelProductCatalogueOrders from "@salesforce/apex/PbProductCatalogueAdminController.updateDepositLevelProductCatalogueOrders";

import P2ConfirmDialog from "c/p2ConfirmDialog";

import { en, fr } from "./p2AdminProdCatDeposit-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2AdminProdCatDeposit extends mix(LightningElement).with(
  MixinLangAware,
  MixinMainBodyBase
) {
  _depositAdmImg = IMAGES_URL + "/placeholder-30.svg";
  moveUpIcon = IMAGES_URL + "/action-move-up.svg";
  moveDownIcon = IMAGES_URL + "/action-move-down.svg";
  editIcon = IMAGES_URL + "/action-edit.svg";

  enrichedFr = deepMerge(fr, en);

  originDepositOrders = new Map();
  depositProdCatIdList = [];
  depositProdCatObjects = [];

  depositLevelOrderChanged = false;
  depositChequeingOrderChanged = false;
  depositSavingOrderChanged = false;

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  langCodeChanged(newCode) {
    this.depositProdCatObjects = this.depositProdCatIdList.map((id) => {
      return {
        id: id,
        label: this.i18n[id]
      };
    });
  }

  get anyChanges() {
    return (
      this.depositLevelOrderChanged ||
      this.depositChequeingOrderChanged ||
      this.depositSavingOrderChanged
    );
  }

  connectedCallback() {
    getDepositLevelProductCatalogues()
      .then((result) => {
        const sortedCats = result.data.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        for (const cat of sortedCats) {
          this.originDepositOrders.set(cat.catalogueType, cat.displayOrder);
          this.depositProdCatIdList.push(cat.catalogueType);
          this.depositProdCatObjects.push({
            id: cat.catalogueType,
            label: this.i18n[cat.catalogueType]
          });
        }
        this.depositProdCatObjects = [...this.depositProdCatObjects];
        this.depositLevelOrderChanged = false;
      })
      .catch((error) => {
        console.error("Error fetching product catalogues:", error);
      });
  }

  async handleAddDepositProduct() {}
}
