import { LightningElement } from "lwc";

const colorMapper = (color) => {
  return {
    ...color,
    style: `background-color: var(${color.var});`,
    label: `${color.var}`
      .substring(10)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  };
};
export default class PocColors extends LightningElement {
  items = [
    {
      id: "1",
      group: "Grey",
      colors: [
        { id: "1", var: "--p-color-grey-dark" },
        { id: "2", var: "--p-color-grey-heavy" },
        { id: "3", var: "--p-color-grey-mid" },
        { id: "4", var: "--p-color-grey-light" },
        { id: "5", var: "--p-color-white" },
        { id: "6", var: "--p-color-black" }
      ].map(colorMapper)
    },
    {
      id: "2",
      group: "Red",
      colors: [
        { id: "1", var: "--p-color-red-dark" },
        { id: "2", var: "--p-color-red" },
        { id: "4", var: "--p-color-red-light" }
      ].map(colorMapper)
    },
    {
      id: "3",
      group: "Orange",
      colors: [
        { id: "1", var: "--p-color-orange-dark" },
        { id: "2", var: "--p-color-orange" },
        { id: "4", var: "--p-color-orange-light" }
      ].map(colorMapper)
    },
    {
      id: "4",
      group: "Yellow",
      colors: [
        { id: "1", var: "--p-color-yellow-dark" },
        { id: "2", var: "--p-color-yellow" },
        { id: "3", var: "--p-color-yellow-light" }
      ].map(colorMapper)
    },
    {
      id: "5",
      group: "Green",
      colors: [
        { id: "1", var: "--p-color-green-dark" },
        { id: "2", var: "--p-color-green" },
        { id: "3", var: "--p-color-green-light" }
      ].map(colorMapper)
    },
    {
      id: "6",
      group: "Teal",
      colors: [
        { id: "1", var: "--p-color-teal-dark" },
        { id: "2", var: "--p-color-teal" },
        { id: "3", var: "--p-color-teal-light" }
      ].map(colorMapper)
    },
    {
      id: "7",
      group: "Blue",
      colors: [
        { id: "1", var: "--p-color-blue-dark" },
        { id: "2", var: "--p-color-blue" },
        { id: "3", var: "--p-color-blue-light" }
      ].map(colorMapper)
    },
    {
      id: "8",
      group: "Purple",
      colors: [
        { id: "1", var: "--p-color-purple-dark" },
        { id: "2", var: "--p-color-purple" },
        { id: "3", var: "--p-color-purple-light" }
      ].map(colorMapper)
    },
    {
      id: "9",
      group: "Pink",
      colors: [
        { id: "1", var: "--p-color-pink-dark" },
        { id: "2", var: "--p-color-pink" },
        { id: "3", var: "--p-color-pink-light" }
      ].map(colorMapper)
    },
    {
      id: "10",
      group: "Brown",
      colors: [
        { id: "1", var: "--p-color-brown-dark" },
        { id: "2", var: "--p-color-brown" },
        { id: "3", var: "--p-color-brown-light" }
      ].map(colorMapper)
    },
    {
      id: "11",
      group: "Panel, Border and Section",
      colors: [
        { id: "1", var: "--p-color-panel-dark" },
        { id: "3", var: "--p-color-panel-light" },
        { id: "4", var: "--p-color-border-light" },
        { id: "5", var: "--p-color-section-light" }
      ].map(colorMapper)
    }
  ];
}
