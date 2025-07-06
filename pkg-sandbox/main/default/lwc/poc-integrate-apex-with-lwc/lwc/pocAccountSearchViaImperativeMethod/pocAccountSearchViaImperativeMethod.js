import { LightningElement, track } from "lwc";
import getAccountsByName from "@salesforce/apex/PocAccountController.getAccountsByName";

export default class PocAccountSearchViaImperativeMethod extends LightningElement {
  @track accountName;
  @track accounts;

  handleSearch() {
    getAccountsByName({ name: this.accountName })
      .then((result) => {
        this.accounts = result;
      })
      .catch((error) => {
        this.leads = undefined;
        console.log(error);
      });
  }

  columns = [
    { label: "ID", fieldName: "Id" },
    { label: "Account Name", fieldName: "Name" }
  ];

  handleAccountNameChange(event) {
    this.accountName = event.target.value;
  }
}
