import { LightningElement } from "lwc";
import { mix, isNotEmpty } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

import { appMenuItems } from "c/p2CoMainMenuFactory";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class PocMainLayout extends mix(LightningElement).with(
  MixinPageBase
) {
  tooManyTreeMenu = false;
  tooManyUtils = false;
  tooManyContents = false;

  appMenuMakr = appMenuItems();

  clientImg = IMAGES_URL + "/placeholder-30.svg";

  treeMenuSelectedItem = "deposit.depositApp";

  currentPage = "Deposit > Deposit Application";
  prevPage = "";

  get mainMenuItems() {
    return this.appMenuMakr(!this.isLangEnglish, {
      tasks: { selected: true, notified: false },
      application: { notified: true }
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
            itemType: "depositApp",
            status: "pending",
            kids: Array.from({ length: 4 }, (_, i) => i + 1).map((i) => ({
              itemKey: "depositProd" + i,
              itemText: this.isLangEnglish
                ? "Deposit Product " + i
                : "Produit de dépôt " + i,
              itemType: "depositProd",
              itemData:
                i % 2 == 0
                  ? {
                      accountNumber: "123456789" + i,
                      textLine3: i < 3 ? "RRSP" : "TFSA"
                    }
                  : {},
              status: i % 2 == 0 ? "ok" : "pending"
            }))
          },
          {
            itemKey: "cardApp",
            itemText: this.isLangEnglish
              ? "Debit Card Application"
              : "Application de carte de débit",
            itemType: "cardApp",
            status: "pending",
            kids: Array.from({ length: 3 }, (_, i) => i + 1).map((i) => ({
              itemKey: "debitCardProd" + i,
              itemText: this.isLangEnglish
                ? "Debit Card " + i
                : "Carte de débit " + i,
              itemType: "debitCardProd",
              status: i % 2 == 0 ? "ok" : "pending"
            }))
          },
          {
            itemKey: "manualReview",
            itemText: this.isLangEnglish
              ? "Manual Review Request"
              : "Demande de révision manuelle",
            itemType: "manualReview",
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
            status: "pending",
            kids: Array.from({ length: 120 }, (_, i) => i + 1).map((i) => ({
              itemKey: "lendingProd" + i,
              itemText: this.isLangEnglish
                ? "Lending Product " + i
                : "Produit de prêt " + i,
              itemType: "lendingProd",
              status: "pending"
            }))
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
            status: "pending",
            kids: Array.from({ length: 3 }, (_, i) => i + 1).map((i) => ({
              itemKey: "creditCardProd" + i,
              itemText: this.isLangEnglish
                ? "Credit Card " + i
                : "Carte de crédit " + i,
              itemData: {
                accountNumber: "123456789" + i,
                textLine3:
                  i <= 1
                    ? "Visa Infinite"
                    : i <= 2
                      ? "Visa Platinum"
                      : "Visa Classic"
              },
              itemType: "creditCardProd",
              status: i % 2 == 0 ? "ok" : "pending"
            }))
          }
        ]
      }
    ];
  }

  get hasPrevPage() {
    return isNotEmpty(this.prevPage);
  }

  handleMenuSelect(event) {
    this.treeMenuSelectedItem = event.detail.key;
    this.prevPage = event.detail.prevKey;
    this.currentPage = event.detail.key;
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

  get utilsExpanded() {
    return true;
  }
}
