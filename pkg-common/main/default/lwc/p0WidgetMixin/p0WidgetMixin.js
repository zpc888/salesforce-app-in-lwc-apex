import { api } from "lwc";

import { isTrue, isNotEmpty } from "c/p0Funcs";

/**
 * @module pkg-common/core/widgets
 */

/**
 * A mixin to make a widget language aware by adding a `langCode` property.
 * @param {Class} superclass  - the class to extend
 * @returns {Class} - the extended class with `langCode` property added
 */
export const MixinLangAware = (superclass) =>
  class extends superclass {
    /**
     * render this component in the specific language code
     * @type {string}
     * @default 'en'
     * @memberof module:pkg-common/core/widgets~MixinWidgetLangAware
     */
    @api langCode = "en";

    isEnglish() {
      return this.langCode === "en";
    }

    isFrench() {
      return !this.isEnglish();
    }
  };

export const MixinFieldEditable = (superclass) =>
  class extends superclass {
    #readOnly = false;
    #required = false;
    #disabled = false;
    #initialValue;
    #newValue;

    requiredTitle = "required";

    @api name = "field";
    @api label;
    @api errorMessage;

    @api get value() {
      return this.#newValue;
    }
    set value(v) {
      this.#newValue = v;
    }

    @api get initialValue() {
      return this.#initialValue;
    }

    set initialValue(v) {
      this.#initialValue = v;
      this.#newValue = v;
    }

    @api get readOnly() {
      return this.#readOnly;
    }
    set readOnly(v) {
      this.#readOnly = isTrue(v);
    }
    @api get required() {
      return this.#required;
    }
    set required(v) {
      this.#required = isTrue(v);
    }

    @api get disabled() {
      return this.#disabled;
    }
    set disabled(v) {
      this.#disabled = isTrue(v);
    }

    @api get hasErrorMessage() {
      return isNotEmpty(this.errorMessage);
    }

    onRenderedCallback(lwcTagName) {
      const fieldClassList = this.template.querySelector(".p-field").classList;
      const comboComp = this.template.querySelector(lwcTagName);
      if (this.readOnly) {
        fieldClassList.add("p-readonly");
      } else {
        fieldClassList.remove("p-readonly");
      }
      if (this.required) {
        fieldClassList.add("p-required");
      } else {
        fieldClassList.remove("p-required");
      }
      if (this.disabled) {
        fieldClassList.add("p-disabled");
      } else {
        fieldClassList.remove("p-disabled");
      }
      if (this.hasErrorMessage) {
        fieldClassList.add("p-error");
        if (comboComp) {
          comboComp.setCustomValidity(this.errorMessage);
          comboComp.reportValidity();
        }
      } else {
        fieldClassList.remove("p-error");
        if (comboComp) {
          comboComp.setCustomValidity("");
          comboComp.reportValidity();
        }
      }
    }

    onValueChanged(event) {
      this.#newValue = event.detail.value;
      if (this.#newValue !== this.#initialValue) {
        this.dispatchEvent(
          new CustomEvent("changed", {
            detail: {
              name: this.name,
              value: this.#newValue
            }
          })
        );
      }
    }
  };

export const MixinModal = (superclass) =>
  class extends superclass {
    #firstTime = true;

    autoFocusOnSelector(sel) {
      if (!this.#firstTime) {
        return;
      }
      this.#firstTime = false;
      const el = this.template.querySelector(sel);
      if (el) {
        el.focus();
      }
    }
  };
