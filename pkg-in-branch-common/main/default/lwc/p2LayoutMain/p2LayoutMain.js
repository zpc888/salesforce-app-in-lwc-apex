import { LightningElement, api } from "lwc";
import SVG_SPRITE_URL from "@salesforce/resourceUrl/p2SvgSprite";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

import { mix, deepMerge, isNotEmpty } from "c/p0Funcs";
import { MixinLangAware } from "c/p0WidgetMixin";

import { en, fr } from "./p2LayoutMain-i18n";

const WIDTH_TO_COLLAPSE_MASTHEAD = 900;
const WIDTH_TO_COLLAPSE_RIGHT_PANEL = 900;
const WIDTH_TO_COLLAPSE_LEFT_RIGHT = 680;
const EMPTY_USER_PHOTO_URL_SUFFIX = "profilephoto/005/T";

export default class P2MainLayout extends mix(LightningElement).with(
  MixinLangAware
) {
  isMastheadExpanded = true;
  isLeftMenuExpanded = true;
  isRightPanelExpanded = true;

  @api userId = null;
  @api userFirstName = null;
  @api userLastName = null;
  @api userName = "Unknown";
  @api userPhotoUrl = "";

  @api rightPanelObject = {};
  @api leftNavObject = {};
  @api appSummaryObject = {};

  enrichedFr = deepMerge(fr, en);

  #manualColseLeftMenu = false;
  #manualColseRightPanel = false;
  #firstTime = true;
  #widowWidth = window.innerWidth;
  #resizeHandler = null;

  switchAppIconUrl = `${IMAGES_URL}/action-exit.svg`;
  logoUrl = `${IMAGES_URL}/placeholder-50.svg`;

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get hasUserPhoto() {
    return (
      isNotEmpty(this.userPhotoUrl) &&
      !this.userPhotoUrl.endsWith(EMPTY_USER_PHOTO_URL_SUFFIX)
    );
  }

  get firstLastInitial() {
    let ret = "";
    if (isNotEmpty(this.userFirstName)) {
      ret += this.userFirstName.charAt(0).toUpperCase();
    }
    if (isNotEmpty(this.userLastName)) {
      ret += this.userLastName.charAt(0).toUpperCase();
    }
    if (ret.length === 0) {
      ret = "-";
    }
    return ret;
  }

  connectedCallback() {
    this.#resizeHandler = this._handleWindowResize.bind(this);
    window.addEventListener("resize", this.#resizeHandler);
  }
  disconnectedCallback() {
    if (this.#resizeHandler) {
      window.removeEventListener("resize", this.#resizeHandler);
      this.#resizeHandler = null;
    }
  }
  renderedCallback() {
    if (this.#firstTime) {
      this.#firstTime = false;
      this._handleWindowResize(true);
    }
  }

  _handleWindowResize(isInitial = false) {
    const oldWidth = this.#widowWidth;
    this.#widowWidth = window.innerWidth;
    this.isMastheadExpanded = this.#widowWidth > WIDTH_TO_COLLAPSE_MASTHEAD;
    const slotSubMenu = this.querySelector("*[slot='subMenu']"); // light dom   VS shadow dom
    const slotUtils = this.querySelector("*[slot='utils']"); // instance vs template
    if (
      this._crossBoundaryChange(
        WIDTH_TO_COLLAPSE_LEFT_RIGHT,
        oldWidth,
        this.#widowWidth
      ) &&
      slotSubMenu &&
      slotSubMenu.handleWindowResize
    ) {
      const subMenuCollapsed = this.#widowWidth <= WIDTH_TO_COLLAPSE_LEFT_RIGHT;
      slotSubMenu.handleWindowResize(isInitial, subMenuCollapsed);
    }
    if (
      this._crossBoundaryChange(
        WIDTH_TO_COLLAPSE_RIGHT_PANEL,
        oldWidth,
        this.#widowWidth
      ) &&
      slotUtils &&
      slotUtils.handleWindowResize
    ) {
      const utilsCollapsed = this.#widowWidth <= WIDTH_TO_COLLAPSE_RIGHT_PANEL;
      slotUtils.handleWindowResize(isInitial, utilsCollapsed);
    }
  }

  _crossBoundaryChange(boundary, prev, curr) {
    return prev <= boundary !== curr <= boundary;
  }

  handleLanguageSwitch() {
    this.dispatchEvent(new CustomEvent("languagechanged"));
  }

  // handleLanguageKeyUp(event) {
  //   if (event.key === "Enter" || event.key === " ") {
  //     this.handleLanguageSwitch();
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

  handleAppSwitch() {
    this.dispatchEvent(new CustomEvent("appchanged"));
  }

  // handleAppKeyUp(event) {
  //   if (event.key === "Enter" || event.key === " ") {
  //     this.handleAppSwitch();
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  // }

  // handleLeftNavClick(event) {
  //   this.dispatchEvent(
  //     new CustomEvent("leftnavclick", {
  //       detail: {
  //         leftNav: event.detail.leftNav
  //       }
  //     })
  //   );
  // }
}
