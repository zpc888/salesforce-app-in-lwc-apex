import { LightningElement, wire, track } from "lwc";
import getAccountsByName from "@salesforce/apex/PocAccountController.getAccountsByName";

export default class PocAccountSearchViaWireFunction extends LightningElement {
  @track accountName;
  @track accounts;

  // should have debounce to avoid unnecessary server calls on every key press
  @wire(getAccountsByName, { name: "$accountName" })
  accountList({ data, error }) {
    if (data) {
      this.accounts = data;
    } else if (error) {
      console.log(error);
    }
  }

  columns = [
    { label: "ID", fieldName: "Id" },
    { label: "Account Name", fieldName: "Name" }
  ];

  handleAccountNameChange(event) {
    this.accountName = event.target.value;
  }
}
