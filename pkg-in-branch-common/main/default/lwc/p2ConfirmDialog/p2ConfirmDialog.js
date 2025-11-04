import { api } from "lwc";
import LightningModal from "lightning/modal";

import { loadStyle } from "lightning/platformResourceLoader";
import p2ModalStyle from "@salesforce/resourceUrl/p2ModalStyle";
import P2_IMAGES from "@salesforce/resourceUrl/p2Images";
import { mix } from "c/p0Funcs";
import { MixinModal } from "c/p0WidgetMixin";

export default class P2ConfirmDialog extends mix(LightningModal).with(
  MixinModal
) {
  @api dialogTitle;
  @api dialogMessage;
  @api confirmButton = "Confirm";
  @api cancelButton = "Cancel";
  @api ariaLabelForCloseIcon = "Close";
  @api dialogImage = P2_IMAGES + "/info-warning.svg";

  _styleLoaded = false;

  renderedCallback() {
    if (!this._styleLoaded) {
      this._styleLoaded = true;
      // Load the stylesheet once; do not wrap a single promise in Promise.all
      loadStyle(this, p2ModalStyle)
        .then(() => {
          this.autoFocusOnSelector("div.p2-tab-placeholder");
        })
        .catch(() => {
          // Even if style load fails, still try autofocus to avoid blocking UX
          this.autoFocusOnSelector("div.p2-tab-placeholder");
        });
    } else {
      // Subsequent renders: just try autofocus
      this.autoFocusOnSelector("div.p2-tab-placeholder");
    }
  }

  handleConfirm() {
    this.close("confirm");
  }

  handleCancel() {
    this.close("cancel");
  }
}
