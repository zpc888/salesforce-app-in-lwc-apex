import { LightningElement } from "lwc";

export default class PocFonts extends LightningElement {
  items = [
    { id: 1, name: "Masthead Title", className: "p-font-masthead-title" },
    { id: 2, name: "H1 Title", className: "p-font-h1-title" },
    { id: 3, name: "H2 Title", className: "p-font-h2-title" },
    { id: 4, name: "H3 Title", className: "p-font-h3-title" },
    { id: 5, name: "Body Large", className: "p-font-body-large" },
    { id: 6, name: "Body Regular", className: "p-font-body-regular" },
    { id: 7, name: "Body Secondary", className: "p-font-body-secondary" },
    {
      id: 8,
      name: "Action Button Link",
      className: "p-font-action-button-link"
    },
    { id: 9, name: "Button Text", className: "p-font-button-text" }
  ];
}
