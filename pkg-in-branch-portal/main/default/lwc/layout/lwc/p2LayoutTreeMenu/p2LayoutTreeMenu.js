import { LightningElement, api } from "lwc";

import {
  buildTreeMenuAncestorsMatcher,
  buildFlatMenus
} from "./p2LayoutTreeMenuUtils";

const ROOT_ITEM_LEVEL = 0;
export default class P2LayoutTreeMenu extends LightningElement {
  _menuItems = []; // root levels
  /*
    {
        itemKey: 'mandatory - unique across its siblings',
        itemText: 'mandatory - visible to the user'
        itemType: 'client, depositApp, lendingApp, depositProd, lendingProd, ...',
        status: 'ok, error, warn, pending, dirty, pristine, ....'
        itemData: 'optional item data'
        iconName: 'optional icon name'
        kids: [...self recursive]
    }
    */
  _selectedKey;

  _flatMenuItems = [];
  _flattenAlready = false;

  @api get menuItems() {
    return this._menuItems;
  }

  set menuItems(value) {
    this._menuItems = value;
    this._flattenAlready = false; // reset flattening
  }

  handleMenuSelect(event) {
    this.dispatchEvent(
      new CustomEvent("menuselect", {
        detail: {
          ...event.detail
        }
      })
    );
  }

  @api get selectedKey() {
    return this._selectedKey;
  }

  set selectedKey(value) {
    this._selectedKey = value;
    this._flattenAlready = false; // reset flattening
  }

  get flatMenuItems() {
    if (this._flattenAlready) {
      return this._flatMenuItems;
    }
    if (this._selectedKey && this.menuItems) {
      if (this._selectedKey.split(".").length === 1) {
        // root level selection
        const rootItem = this.menuItems.filter(
          (item) => item.itemKey === this._selectedKey
        );
        if (rootItem.length === 1 && !rootItem[0].hasContent) {
          // not allow to click at root level
          // auto to make the first child clickable
          if (rootItem[0].kids && rootItem[0].kids.length > 0) {
            this._selectedKey =
              this._selectedKey + "." + rootItem[0].kids[0].itemKey;
          }
        }
      }
      // console.log("ZPC debug: ", JSON.stringify(this.menuItems, null, 2));
      const collector = [];
      this.menuItems.forEach((v, i) => {
        buildFlatMenus(collector, "", v, i, ROOT_ITEM_LEVEL);
      });
      this._flatMenuItems = collector;
      // console.log("ZPC debug 2: ", JSON.stringify(collector, null, 2));
      const treeMenuMatcher = buildTreeMenuAncestorsMatcher(this._selectedKey);
      for (const item of this._flatMenuItems) {
        item.visible = treeMenuMatcher.match(item.itemKey);
      }
      // console.log(
      //   "ZPC debug 3: ",
      //   JSON.stringify(this._flatMenuItems, null, 2)
      // );
      this._flattenAlready = true;
      return this._flatMenuItems;
    } else {
      return [];
    }
  }
}
