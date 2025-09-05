import { LightningElement, api } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, isTrue } from "c/p0Funcs";

export default class P2MainLayoutLeftNav extends mix(LightningElement).with(
  MixinLangAware
) {
  @api menuItems = []; // { name, label, img, selectedImg, selected, notified }[]

  mouseOverNavItemName;

  renderedCallback() {
    this.refreshSelectionAndNotification();
  }

  handleMouseOverNavItem(event) {
    // this.mouseOverNavItemName = event.currentTarget.dataset.itemName;
    this.mouseOverNavItemName = event.target.getAttribute("data-item-name");
  }

  handleMouseOutNavItem() {
    this.mouseOverNavItemName = "";
  }

  handleClickNavItem(event) {
    event.preventDefault();
    const whichItem = event.currentTarget.dataset.itemName;
    const clickedItem = this.menuItems.find((item) => item.name === whichItem);
    if (clickedItem && isTrue(clickedItem.selected)) {
      return;
    }
    this.navigateTo(clickedItem.implemntationComp);
  }

  navigateTo(leftNav) {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: {
          leftNav
        }
      })
    );
  }

  @api refreshSelectionAndNotification() {
    this.template.querySelectorAll(".p-left-nav-item").forEach((el) => {
      const itemName = el.dataset.itemName; // el.getAttribute("data-item-name")
      const corrItem = this.menuItems.find((item) => item.name === itemName);
      if (corrItem) {
        this._syncCssClassIf(
          isTrue(corrItem.selected),
          el,
          "p-left-nav-item-selected"
        );
        this._syncCssClassIf(
          isTrue(corrItem.notified),
          el,
          "p-left-nav-item-notified"
        );
      }
    });
  }

  _syncCssClassIf(condition, element, cssClass) {
    if (condition) {
      element.classList.add(cssClass);
    } else {
      element.classList.remove(cssClass);
    }
  }
}
