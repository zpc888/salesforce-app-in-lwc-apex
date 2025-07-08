import { LightningElement } from "lwc";

import P_SPRITE_URL from "@salesforce/resourceUrl/p2SvgSprite";
import P_IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export default class PocIcons extends LightningElement {
  spriteItems = [
    {
      group: "arrow",
      icons: [
        { id: 1, name: "left" },
        { id: 2, name: "right" },
        { id: 3, name: "up" },
        { id: 4, name: "down" }
      ]
    }
  ];
  imageItems = [
    {
      group: "action",
      icons: [
        { id: 1, name: "add-new" },
        { id: 2, name: "address" },
        { id: 3, name: "add" },
        { id: 4, name: "attach" },
        { id: 5, name: "break-link" },
        { id: 6, name: "cancel-card" },
        { id: 7, name: "card" },
        { id: 8, name: "date" },
        { id: 9, name: "disable" },
        { id: 10, name: "download" },
        { id: 11, name: "edit" },
        { id: 12, name: "email" },
        { id: 13, name: "exit" },
        { id: 14, name: "folder" },
        { id: 15, name: "hide" },
        { id: 16, name: "home" },
        { id: 17, name: "id" },
        { id: 18, name: "link" },
        { id: 19, name: "list" },
        { id: 20, name: "lock" },
        { id: 21, name: "move" },
        { id: 22, name: "phone" },
        { id: 23, name: "reduce" },
        { id: 24, name: "remove" },
        { id: 25, name: "role" },
        { id: 26, name: "save" },
        { id: 27, name: "search" },
        { id: 28, name: "switch" },
        { id: 29, name: "time" },
        { id: 30, name: "unlock" },
        { id: 31, name: "upload" },
        { id: 32, name: "verified" },
        { id: 33, name: "view" }
      ]
    },
    {
      group: "basic",
      icons: [{ id: 34, name: "close" }]
    },
    {
      group: "field",
      icons: [
        { id: 35, name: "check-mark" },
        { id: 36, name: "error" },
        { id: 37, name: "tooltip" }
      ]
    },
    {
      group: "indicator",
      icons: [
        { id: 38, name: "attention" },
        { id: 39, name: "success" }
      ]
    },
    {
      group: "info",
      icons: [
        { id: 40, name: "error" },
        { id: 41, name: "info" },
        { id: 42, name: "ok" },
        { id: 43, name: "warning" }
      ]
    },
    {
      group: "leftnav",
      icons: [
        { id: 44, name: "application-selected" },
        { id: 45, name: "application" },
        { id: 46, name: "client-selected" },
        { id: 47, name: "client" },
        { id: 48, name: "services-selected" },
        { id: 49, name: "services" },
        { id: 50, name: "signing-selected" },
        { id: 51, name: "signing" },
        { id: 52, name: "tasks-selected" },
        { id: 53, name: "tasks" }
      ]
    },
    {
      group: "menu",
      icons: [
        { id: 54, name: "app-selected" },
        { id: 55, name: "app" },
        { id: 56, name: "business-selected" },
        { id: 57, name: "business" },
        { id: 58, name: "card-selected" },
        { id: 59, name: "card" },
        { id: 60, name: "package-selected" },
        { id: 61, name: "package" },
        { id: 62, name: "person-selected" },
        { id: 63, name: "person" },
        { id: 64, name: "structure-selected" },
        { id: 65, name: "structure" }
      ]
    },
    {
      group: "object",
      icons: [
        { id: 66, name: "business" },
        { id: 67, name: "cart" },
        { id: 68, name: "collateral" },
        { id: 69, name: "credit-bureau" },
        { id: 70, name: "credit-card" },
        { id: 71, name: "debit-card" },
        { id: 72, name: "decision" },
        { id: 73, name: "deposit" },
        { id: 74, name: "document" },
        { id: 75, name: "lending" },
        { id: 76, name: "person" },
        { id: 77, name: "structure" },
        { id: 78, name: "tasks" }
      ]
    },
    {
      group: "placeholder",
      icons: [
        { id: 79, name: "15" },
        { id: 80, name: "20" },
        { id: 81, name: "30" },
        { id: 82, name: "40" },
        { id: 83, name: "50" },
        { id: 84, name: "60" }
      ]
    },
    {
      group: "sidepanel",
      icons: [
        { id: 85, name: "close-left-selected" },
        { id: 86, name: "close-left" },
        { id: 87, name: "close-right-selected" },
        { id: 88, name: "close-right" },
        { id: 89, name: "open-left-selected" },
        { id: 90, name: "open-left" },
        { id: 91, name: "open-right-selected" },
        { id: 92, name: "open-right" }
      ]
    }
  ];
  items = [
    ...this.spriteItems.map((item) => {
      return {
        group: item.group.charAt(0).toUpperCase() + item.group.slice(1),
        icons: item.icons.map((icon) => {
          return {
            sprite: true,
            ...icon,
            imgUrl: P_SPRITE_URL + `#${item.group}_${icon.name}`
          };
        })
      };
    }),
    ...this.imageItems.map((item) => {
      return {
        group: item.group.charAt(0).toUpperCase() + item.group.slice(1),
        icons: item.icons.map((icon) => {
          return {
            ...icon,
            imgUrl: P_IMAGES_URL + `/${item.group}-${icon.name}.svg`
          };
        })
      };
    })
  ];
}
