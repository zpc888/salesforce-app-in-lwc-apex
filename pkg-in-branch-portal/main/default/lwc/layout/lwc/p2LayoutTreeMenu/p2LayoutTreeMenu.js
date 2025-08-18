import { LightningElement, api } from "lwc";

import {
  buildTreeMenuAncestorsMatcher,
  buildFlatMenus
} from "./p2LayoutTreeMenuUtils";

const ROOT_ITEM_LEVEL = 0;
export default class P2LayoutTreeMenu extends LightningElement {
  @api menuItems = []; // root levels
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
  @api selectedKey;

  _flatMenuItems = [];
  _flattenAlready = false;

  handleMenuSelect(event) {
    this.dispatchEvent(
      new CustomEvent("menuselect", {
        detail: {
          ...event.detail
        }
      })
    );
  }

  get flatMenuItems() {
    if (this._flattenAlready) {
      return this._flatMenuItems;
    }
    if (this.selectedKey && this.menuItems) {
      console.log("ZPC debug: ", JSON.stringify(this.menuItems, null, 2));
      const collector = [];
      this.menuItems.forEach((v, i) => {
        buildFlatMenus(collector, "", v, i, ROOT_ITEM_LEVEL);
      });
      this._flatMenuItems = collector;
      console.log("ZPC debug 2: ", JSON.stringify(collector, null, 2));
      const treeMenuMatcher = buildTreeMenuAncestorsMatcher(this.selectedKey);
      for (const item of this._flatMenuItems) {
        item.visible = treeMenuMatcher.match(item.itemKey);
      }
      console.log(
        "ZPC debug 3: ",
        JSON.stringify(this._flatMenuItems, null, 2)
      );
      this._flattenAlready = true;
      return this._flatMenuItems;
    } else {
      return [];
    }
  }
}
