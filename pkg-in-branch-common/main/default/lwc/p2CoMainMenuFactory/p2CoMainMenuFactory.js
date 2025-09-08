import { deepMerge } from "c/p0Funcs";

import {
  enAppMenu,
  frAppMenu,
  enAdmMenu,
  frAdmMenu
} from "./p2CoMainMenuFactory-i18n";
import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

export function adminMenuItems() {
  const enrichedFr = deepMerge(frAdmMenu, enAdmMenu);

  const prodCatImg = IMAGES_URL + "/placeholder-40.svg";
  const prodCatSelectedImg = IMAGES_URL + "/placeholder-40.svg";

  return (isFrench, opts) => {
    const i18n = isFrench ? enrichedFr : enAdmMenu;
    const optConfig = (itemName, prop) =>
      opts && opts[itemName] && opts[itemName][prop]
        ? opts[itemName][prop]
        : false;
    return [
      {
        name: "productCatalog",
        label: i18n.leftNavProductCatalog,
        img: prodCatImg,
        selectedImg: prodCatSelectedImg,
        selected: optConfig("productCatalog", "selected"),
        notified: optConfig("productCatalog", "notified")
      }
    ];
  };
}

export function appMenuItems() {
  const enrichedFr = deepMerge(frAppMenu, enAppMenu);

  const tasksImg = IMAGES_URL + "/leftnav-tasks.svg";
  const clientImg = IMAGES_URL + "/leftnav-client.svg";
  const applicationImg = IMAGES_URL + "/leftnav-application.svg";
  const signingImg = IMAGES_URL + "/leftnav-signing.svg";
  const referralImg = IMAGES_URL + "/leftnav-services.svg";

  const tasksSelectedImg = IMAGES_URL + "/leftnav-tasks-selected.svg";
  const clientSelectedImg = IMAGES_URL + "/leftnav-client-selected.svg";
  const applicationSelectedImg =
    IMAGES_URL + "/leftnav-application-selected.svg";
  const signingSelectedImg = IMAGES_URL + "/leftnav-signing-selected.svg";
  const referralSelectedImg = IMAGES_URL + "/leftnav-services-selected.svg";

  // opts { tasks: { selected, notified }, client: { selected, notified }, ... }
  return (isFrench, opts) => {
    const i18n = isFrench ? enrichedFr : enAppMenu;
    const optConfig = (itemName, prop) =>
      opts && opts[itemName] && opts[itemName][prop]
        ? opts[itemName][prop]
        : false;
    return [
      {
        name: "tasks",
        label: i18n.leftNavTasks,
        img: tasksImg,
        selectedImg: tasksSelectedImg,
        selected: optConfig("tasks", "selected"),
        notified: optConfig("tasks", "notified")
      },
      {
        name: "client",
        label: i18n.leftNavClient,
        img: clientImg,
        selectedImg: clientSelectedImg,
        selected: optConfig("client", "selected"),
        notified: optConfig("client", "notified")
      },
      {
        name: "application",
        label: i18n.leftNavApplication,
        img: applicationImg,
        selectedImg: applicationSelectedImg,
        selected: optConfig("application", "selected"),
        notified: optConfig("application", "notified")
      },
      {
        name: "signing",
        label: i18n.leftNavSigning,
        img: signingImg,
        selectedImg: signingSelectedImg,
        selected: optConfig("signing", "selected"),
        notified: optConfig("signing", "notified")
      },
      {
        name: "referral",
        label: i18n.leftNavReferral,
        img: referralImg,
        selectedImg: referralSelectedImg,
        selected: optConfig("referral", "selected"),
        notified: optConfig("referral", "notified")
      }
    ];
  };
}
