import { LightningElement, api } from "lwc";

export default class P2CoContentButton extends LightningElement {
  @api imgSrc;
  @api btnLabel;

  async handleClick(event) {
    event.stopPropagation(); // prevent double click events for parent components since it creates a custom click
    const selectedEvent = new CustomEvent("click");
    this.dispatchEvent(selectedEvent);
  }
}
