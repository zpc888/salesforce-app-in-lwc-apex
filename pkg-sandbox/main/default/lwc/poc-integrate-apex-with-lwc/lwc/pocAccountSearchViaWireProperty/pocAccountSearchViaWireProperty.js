import { LightningElement, wire, track } from "lwc";
import getAccountsByName from "@salesforce/apex/PocAccountController.getAccountsByName";

export default class PocAccountSearchViaWireProperty extends LightningElement {
  @track accountName;

  // should have debounce to avoid unnecessary server calls on every key press
  @wire(getAccountsByName, { name: "$accountName" })
  accounts;
  /* 
   {
        data: [],
        error: {
        }
   }
*/

  columns = [
    { label: "ID", fieldName: "Id" },
    { label: "Account Name", fieldName: "Name" }
  ];

  handleAccountNameChange(event) {
    this.accountName = event.target.value;
  }
}
