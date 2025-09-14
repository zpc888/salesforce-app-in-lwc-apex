import { LightningElement } from "lwc";
import { mix, deepMerge } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

import { appMenuItems } from "c/p2CoMainMenuFactory";
import { en, fr } from "./p2OnboardProd-i18n";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2OnboardProd extends mix(LightningElement).with(
  MixinPageBase
) {
  appMenuMaker = appMenuItems();

  clientImg = IMAGES_URL + "/placeholder-30.svg";

  enrichedFr = deepMerge(fr, en);
  treeMenuSelectedItem = "deposit.depositApp";

  get i18n() {
    return !this.isLangEnglish ? this.enrichedFr : en;
  }

  get otherApps() {
    return [
      {
        name: "AdminPortal",
        label: this.i18n.adminPortalAppLabel,
        url: "p2AdminProdCat"
      },
      {
        name: "PocLayout",
        label: this.i18n.pocMainLayoutAppLabel,
        url: "pocMainLayout"
      }
    ];
  }

  get mainMenuItems() {
    return this.appMenuMaker(!this.isLangEnglish, {
      tasks: { selected: false, notified: false },
      application: { selected: true, notified: true }
    });
  }

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

  get treeMenuItems() {
    return [
      {
        itemKey: "deposit",
        itemText: this.isLangEnglish ? "Deposit" : "Dépôt",
        itemType: "deposit",
        status: "pending",
        kids: [
          {
            itemKey: "depositApp",
            itemText: this.isLangEnglish
              ? "Deposit Application"
              : "Application de dépôt",
            itemImg: IMAGES_URL + "/menu-package.svg",
            itemImgSelected: IMAGES_URL + "/menu-package-selected.svg",
            itemType: "depositApp",
            status: "pending"
          },
          {
            itemKey: "cardApp",
            itemText: this.isLangEnglish
              ? "Debit Card Application"
              : "Application de carte de débit",
            itemType: "cardApp",
            itemImg: IMAGES_URL + "/menu-card.svg",
            itemImgSelected: IMAGES_URL + "/menu-card-selected.svg",
            status: "pending"
          },
          {
            itemKey: "manualReview",
            itemText: this.isLangEnglish
              ? "Manual Review Request"
              : "Demande de révision manuelle",
            itemType: "manualReview",
            itemImg: IMAGES_URL + "/menu-manual-review.svg",
            itemImgSelected: IMAGES_URL + "/menu-manual-review-selected.svg",
            status: "ok"
          }
        ]
      },
      {
        itemKey: "lending",
        itemText: this.isLangEnglish ? "Lending" : "Prêt",
        itemType: "lending",
        status: "pending",
        kids: [
          {
            itemKey: "lendingApp",
            itemText: this.isLangEnglish
              ? "Lending Application"
              : "Application de prêt",
            itemType: "lendingApp",
            itemImg: IMAGES_URL + "/menu-package.svg",
            itemImgSelected: IMAGES_URL + "/menu-package-selected.svg",
            status: "pending"
          }
        ]
      },
      {
        itemKey: "creditCard",
        itemText: this.isLangEnglish ? "Credit Card" : "Carte de crédit",
        itemType: "creditCard",
        status: "pending",
        kids: [
          {
            itemKey: "creditCardPkg",
            itemText: this.isLangEnglish
              ? "Credit Card Package"
              : "Forfait de carte de crédit",
            itemType: "creditCardPkg",
            itemImg: IMAGES_URL + "/menu-card.svg",
            itemImgSelected: IMAGES_URL + "/menu-card-selected.svg",
            status: "pending"
          }
        ]
      }
    ];
  }

  handleMenuSelect(event) {
    this.treeMenuSelectedItem = event.detail.key;
  }

  get timelineTitle() {
    return this.isLangEnglish ? "Timeline" : "Chronologie";
  }

  get timelineItems() {
    return [
      {
        id: "1",
        heading: this.isLangEnglish
          ? "Timeline Item 1"
          : "Élément de chronologie 1",
        dateTime: "2023-01-01T00:00:00Z",
        operatorName: "David Smith",
        operatorId: "dsmith",
        comments: "aflsjkflaskj lakjsdf",
        status: "pending"
      },
      {
        id: "2",
        heading: this.isLangEnglish
          ? "Timeline Item 2"
          : "Élément de chronologie 2",
        dateTime: "2025-01-01T00:00:00Z",
        operatorName: "Linda Cheng",
        operatorId: "lcheng",
        comments: "Testing laskjf",
        status: "submit"
      }
    ];
  }

  // get utilsExpanded() {
  //   return true;
  // }
}
