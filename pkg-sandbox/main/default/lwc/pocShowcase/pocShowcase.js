import { LightningElement } from "lwc";

export default class PocShowcase extends LightningElement {
  items = [
    { name: "Fonts", comp: "pocFonts" },
    { name: "Colors", comp: "pocColors" },
    { name: "Icons", comp: "pocIcons" }
  ];

  async handleShowItemClick(event) {
    const itemComp = event.target.dataset.itemComp;
    if (itemComp) {
      window.open(
        `/lightning/cmp/c__${itemComp}`,
        "_blank",
        "noopener noreferrer"
      );
    }
  }
}
