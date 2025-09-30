import { LightningElement, api } from "lwc";

export default class P2CoContentButton extends LightningElement {
  @api imgSrc;
  @api btnLabel;

  handleClick() {
    const selectedEvent = new CustomEvent("click");
    this.dispatchEvent(selectedEvent);
  }
}
