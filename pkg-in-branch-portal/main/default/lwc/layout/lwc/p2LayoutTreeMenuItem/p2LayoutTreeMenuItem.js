import { LightningElement, api } from "lwc";

import { isNotEmpty, isEmpty } from "c/p0Funcs";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

const ROOT_ITEM_LEVEL = 0;
export default class P2LayoutTreeMenuItem extends LightningElement {
  _item;
  _selectedKey;

  itemImg;
  // textLine1 - item.itemText
  // textLine2 & textLine3 logic is moved into build-tree-menu-item
  // textLine2;  // optional for business structure, roles, or account number, or card number
  // textLine3;  // optional for card type, etc
  itemTypeCssSuffix = null;

  expandedImg = IMAGES_URL + "/chevron-down.svg";
  collapsedImg = IMAGES_URL + "/chevron-up.svg";

  @api get item() {
    return this._item;
  }

  @api get selectedKey() {
    return this._selectedKey;
  }

  set item(value) {
    this._item = value;
    this._refresh();
  }

  set selectedKey(value) {
    this._selectedKey = value;
    this._refresh();
  }

  get hasItemImg() {
    return isNotEmpty(this.itemImg);
  }

  get cssClass() {
    let ret = "p-tree-menu";
    if (this.item) {
      ret += ` p-tree-menu-level${this.item.nestedLevel}`;
    }
    if (this.itemTypeCssSuffix) {
      ret += ` p-tree-menu-type-${this.itemTypeCssSuffix}`;
    }
    if (this.isSelected) {
      ret += ` p-tree-menu-selected`;
    } else if (this.isAncestorOfSelection) {
      // ancestor
      ret += ` p-tree-menu-expanded`;
      // } else if (this.shouldHide) {          // hide is done before passing
      //     ret += ` p-tree-menu-hide`;
    }
    return ret;
  }

  get isLevel0() {
    return this.item?.nestedLevel === ROOT_ITEM_LEVEL;
  }

  get isLevel1() {
    return this.item?.nestedLevel === ROOT_ITEM_LEVEL + 1;
  }

  get isLevel2() {
    return this.item?.nestedLevel === ROOT_ITEM_LEVEL + 2;
  }

  get hasIcon() {
    return this.item?.iconName;
  }

  get hasStatus() {
    return this.item?.status;
  }

  get isPendingStatus() {
    return this.item?.status === "pending";
  }

  get isOkStatus() {
    return this.item?.status === "ok";
  }

  get isErrorStatus() {
    return this.item?.status === "error";
  }

  get hasKids() {
    return this.item?.hasKids;
  }

  get hasNoKids() {
    return !this.hasKids;
  }

  get hasTextLine2() {
    return this.item?.textLine2;
  }

  get hasTextLine3() {
    return this.item?.textLine3;
  }

  get isSelected() {
    return this.selectedKey === this.item?.itemKey;
  }

  get isAncestorOfSelection() {
    return this.selectedKey && this.selectedKey.startsWith(this.item?.itemKey);
  }

  get isSelectedOrAncestor() {
    return this.isSelected || this.isAncestorOfSelection;
  }

  _refresh() {
    if (isEmpty(this.item) || isEmpty(this.selectedKey)) {
      return;
    }
    /*
    if (this.item.itemType === "client") {
      this.itemTypeCssSuffix = "client";
    } else if (this.item.itemType === "businessClient") {
      this.itemTypeCssSuffix = "business-client";
      this.itemImg = IMAGES_URL + "/tree_menu_business_client.svg";
    } else if (this.item.itemType === "personalClient") {
      this.itemTypeCssSuffix = "personal-client";
      this.itemImg = IMAGES_URL + "/tree_menu_personal_client.svg";
    } else if (this.item.itemType === "depositApp") {
      this.itemTypeCssSuffix = "deposit-app";
    } else if (this.item.itemType === "lendingApp") {
      this.itemTypeCssSuffix = "lending-app";
    } else if (this.item.itemType === "depositProd") {
      this.itemTypeCssSuffix = "deposit-prod";
      this.itemImg = IMAGES_URL + "/tree_menu_deposit_prod.svg";
    } else if (this.item.itemType === "lendingProd") {
      this.itemTypeCssSuffix = "lending-prod";
      this.itemImg = IMAGES_URL + "/tree_menu_lending_prod.svg";
    } else {
      //   throw new Error("Unknown item type" + this.item.itemType);
    }
      */
    if (this.isLevel0) {
      this.itemImg = null;
      // no image for first level
    } else if (this.isLevel1) {
      if (
        this.item.itemType === "depositApp" ||
        this.item.itemType === "lendingApp"
      ) {
        this.itemImg =
          IMAGES_URL +
          (this.isSelectedOrAncestor
            ? "/menu-package-selected.svg"
            : "/menu-package.svg");
      } else if (this.item.itemType === "cardApp") {
        this.itemImg =
          IMAGES_URL +
          (this.isSelectedOrAncestor
            ? "/menu-card-selected.svg"
            : "/menu-card.svg");
      } else if (this.item.itemType === "manualReview") {
        this.itemImg =
          IMAGES_URL +
          (this.isSelectedOrAncestor
            ? "/menu-manual-review-selected.svg"
            : "/menu-manual-review.svg");
      }
    } else if (this.isLevel2) {
      this.itemImg = IMAGES_URL + "/menu-leaf-icon.svg";
    }
  }

  renderedCallback() {
    this.refs.refStatus.classList.toggle(
      "p-tree-menu-is-pending",
      this.isPendingStatus
    );
    this.refs.refText.classList.remove(
      "p-font-h1-title",
      "p-font-h2-title",
      "p-font-h3-title"
    );
    this.refs.refText.classList.add(
      this.isLevel0
        ? "p-font-h1-title"
        : this.isLevel1
          ? "p-font-h2-title"
          : "p-font-h3-title"
    );
    this.refs.refButton.disabled = this.isSelectedOrAncestor;
  }

  handleSelection() {
    if (this.isSelected) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent("menuselect", {
        detail: {
          key: this.item.itemKey,
          prevKey: this.selectedKey
        }
      })
    );
  }
}
