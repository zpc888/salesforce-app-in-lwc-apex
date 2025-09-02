import { api, LightningElement } from "lwc";

export default class P2LayoutAppInfo extends LightningElement {
  @api appInfo; // { imgUrl, clientName, attrs: [{ label, value }]  }

  get hasAttrs() {
    return this.appInfo && this.appInfo.attrs && this.appInfo.attrs.length > 0;
  }
}
