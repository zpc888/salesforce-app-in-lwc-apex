import { LightningElement, api } from "lwc";
import { MixinLangAware } from "c/p0WidgetMixin";
import { mix, deepMerge, isTrue } from "c/p0Funcs";

import { en, fr } from "./p2MainLayoutLeftNav-i18n";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class P2MainLayoutLeftNav extends mix(LightningElement).with(
  MixinLangAware
) {
  enrichedFr = deepMerge(fr, en);

  tasksImg = IMAGES_URL + "/leftnav-tasks.svg";
  clientImg = IMAGES_URL + "/leftnav-client.svg";
  applicationImg = IMAGES_URL + "/leftnav-application.svg";
  signingImg = IMAGES_URL + "/leftnav-signing.svg";
  referralImg = IMAGES_URL + "/leftnav-services.svg";

  tasksSelectedImg = IMAGES_URL + "/leftnav-tasks-selected.svg";
  clientSelectedImg = IMAGES_URL + "/leftnav-client-selected.svg";
  applicationSelectedImg = IMAGES_URL + "/leftnav-application-selected.svg";
  signingSelectedImg = IMAGES_URL + "/leftnav-signing-selected.svg";
  referralSelectedImg = IMAGES_URL + "/leftnav-services-selected.svg";

  _mouseOverNavItemName;

  @api tasksSelected = false;
  @api clientSelected = false;
  @api applicationSelected = false;
  @api signingSelected = false;
  @api referralSelected = false;

  @api tasksNotified = false;
  @api clientNotified = false;
  @api applicationNotified = false;
  @api signingNotified = false;
  @api referralNotified = false;

  tasksItemName = "tasks";
  clientItemName = "client";
  applicationItemName = "application";
  signingItemName = "signing";
  referralItemName = "referral";

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get tasksImage() {
    return isTrue(this.tasksSelected) ||
      this._mouseOverNavItemName === this.tasksItemName
      ? this.tasksSelectedImg
      : this.tasksImg;
  }

  get clientImage() {
    return isTrue(this.clientSelected) ||
      this._mouseOverNavItemName === this.clientItemName
      ? this.clientSelectedImg
      : this.clientImg;
  }

  get applicationImage() {
    return isTrue(this.applicationSelected) ||
      this._mouseOverNavItemName === this.applicationItemName
      ? this.applicationSelectedImg
      : this.applicationImg;
  }

  get signingImage() {
    return isTrue(this.signingSelected) ||
      this._mouseOverNavItemName === this.signingItemName
      ? this.signingSelectedImg
      : this.signingImg;
  }

  get referralImage() {
    return isTrue(this.referralSelected) ||
      this._mouseOverNavItemName === this.referralItemName
      ? this.referralSelectedImg
      : this.referralImg;
  }

  renderedCallback() {
    this.refreshSelectionAndNotification();
  }

  handleMouseOverNavItem(event) {
    // this._mouseOverNavItemName = event.currentTarget.dataset.itemName;
    this._mouseOverNavItemName = event.target.getAttribute("data-item-name");
  }

  handleMouseOutNavItem() {
    this._mouseOverNavItemName = "";
  }

  handleClickNavItem(event) {
    event.preventDefault();
    const whichItem = event.currentTarget.dataset.itemName;
    if (whichItem === this.tasksItemName) {
      if (this.tasksSelected) {
        return; // already on this page
      }
      this.navigateTo(viewLeftNav.tasks);
    } else if (whichItem === this.clientItemName) {
      if (this.clientSelected) {
        return;
      }
      this.navigateTo(viewLeftNav.client);
    } else if (whichItem === this.applicationItemName) {
      if (this.applicationSelected) {
        return;
      }
      this.navigateTo(viewLeftNav.application);
    } else if (whichItem === this.signingItemName) {
      if (this.signingSelected) {
        return;
      }
      this.navigateTo(viewLeftNav.signing);
    } else if (whichItem === this.referralItemName) {
      if (this.referralSelected) {
        return;
      }
      this.navigateTo(viewLeftNav.referral);
    }
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
    this._syncCssClassIf(
      this.tasksSelected,
      this.refs.refTasks,
      "p-left-nav-item-selected"
    );
    this._syncCssClassIf(
      this.clientSelected,
      this.refs.refClient,
      "p-left-nav-item-selected"
    );
    this._syncCssClassIf(
      this.applicationSelected,
      this.refs.refApplication,
      "p-left-nav-item-selected"
    );
    this._syncCssClassIf(
      this.signingSelected,
      this.refs.refSigning,
      "p-left-nav-item-selected"
    );
    this._syncCssClassIf(
      this.referralSelected,
      this.refs.refReferral,
      "p-left-nav-item-selected"
    );

    this._syncCssClassIf(
      this.tasksNotified,
      this.refs.refTasks,
      "p-left-nav-item-notified"
    );
    this._syncCssClassIf(
      this.clientNotified,
      this.refs.refClient,
      "p-left-nav-item-notified"
    );
    this._syncCssClassIf(
      this.applicationNotified,
      this.refs.refApplication,
      "p-left-nav-item-notified"
    );
    this._syncCssClassIf(
      this.signingNotified,
      this.refs.refSigning,
      "p-left-nav-item-notified"
    );
    this._syncCssClassIf(
      this.referralNotified,
      this.refs.refReferral,
      "p-left-nav-item-notified"
    );
  }

  _syncCssClassIf(condition, element, cssClass) {
    if (condition) {
      element.classList.add(cssClass);
    } else {
      element.classList.remove(cssClass);
    }
  }
}
