import { loadStyle } from "lightning/platformResourceLoader";
import { wire, track } from "lwc";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
import { getRecord, updateRecord } from "lightning/uiRecordApi";

import USER_ID from "@salesforce/user/Id";
import USER_FIRST_NAME from "@salesforce/schema/User.FirstName";
import USER_LAST_NAME from "@salesforce/schema/User.LastName";
import USER_NAME from "@salesforce/schema/User.Name";
import USER_LANG_LOC_KEY from "@salesforce/schema/User.LanguageLocaleKey";
import USER_PHOTO_URL from "@salesforce/schema/User.SmallPhotoUrl";

import p2GlobalStyle from "@salesforce/resourceUrl/p2GlobalStyle";

import { isNotEmpty, extractErrorMessage } from "c/p0Funcs";
import { inSession } from "c/p0SessionUtils";

const ENGLISH_LOCALE_KEY = "en_US";
const FRENCH_LOCALE_KEY = "fr";

export const MixinPageBase = (Base) =>
  class extends NavigationMixin(Base) {
    error = null;
    userId = USER_ID;
    userFirstName = "";
    userLastName = "";
    userName = "";
    userPhotoUrl = "";
    userLanguage = ENGLISH_LOCALE_KEY;

    accountId = null;

    @track layoutAppObject = {
      businessName: ""
    };

    connectedCallback() {
      Promise.all([loadStyle(this, p2GlobalStyle)]);
      this.doConnectedCallback();
    }

    doConnectedCallback() {
      // Custom logic to be executed on component connection
    }

    get langCode() {
      return this.userLanguage === FRENCH_LOCALE_KEY ? "fr" : "en";
    }

    get isLangEnglish() {
      return this.langCode === "en";
    }

    get hasError() {
      return isNotEmpty(this.error);
    }

    handleLanguageChange() {
      const newLang =
        this.userLanguage === ENGLISH_LOCALE_KEY
          ? FRENCH_LOCALE_KEY
          : ENGLISH_LOCALE_KEY;
      const fields = {
        Id: this.userId,
        LanguageLocaleKey: newLang
      };
      // console.log("ZPC Debug: handle lanuage change, new langauge = ", newLang);
      updateRecord({ fields })
        .then(() => {
          this.userLanguage = newLang;
          console.log("Language updated successfully:", this.userLanguage);
        })
        .catch((error) => {
          this.error = error;
          console.error("Error updating language:", this.error);
        });
    }

    handleAppSwitchEvent(event) {
      const { url, appName } = event.detail;
      console.log("app switch event handling...", url, appName);
      if (url) {
        this[NavigationMixin.Navigate]({
          type: "standard__component",
          attributes: {
            componentName: "c__" + url
          },
          state: {
            c__appName: appName
          }
        });
      }
    }

    @wire(CurrentPageReference)
    setPageReference(pageRef) {
      if (pageRef && pageRef.state && pageRef.state.c__accountId) {
        this.accountId = pageRef.state.c__accountId;
      }
      const jumpingState = inSession(this.accountId).getAndDeleteJumpingState();
      this.afterPageReferenceSet(jumpingState);
    }

    afterPageReferenceSet(jumpingState) {}

    @wire(getRecord, {
      recordId: USER_ID,
      fields: [
        USER_FIRST_NAME,
        USER_LAST_NAME,
        USER_NAME,
        USER_LANG_LOC_KEY,
        USER_PHOTO_URL
      ]
    })
    wiredUser({ error, data }) {
      if (data) {
        this.userFirstName = data.fields.FirstName.value;
        this.userLastName = data.fields.LastName.value;
        this.userName = data.fields.Name.value;
        this.userLanguage =
          data.fields.LanguageLocaleKey.value || ENGLISH_LOCALE_KEY;
        this.userPhotoUrl = data.fields.SmallPhotoUrl.value;
      } else if (error) {
        this.error = extractErrorMessage(error);
        console.error("Error loading user data:", extractErrorMessage(error));
      }
    }
  };
