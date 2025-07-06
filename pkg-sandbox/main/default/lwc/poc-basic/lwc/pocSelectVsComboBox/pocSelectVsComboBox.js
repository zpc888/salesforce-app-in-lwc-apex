import { LightningElement } from "lwc";

export default class PocSelectVsComboBox extends LightningElement {
  initComboValue = "inProgress";
  noInitComboValue;

  initSelectValue = "Completed";
  noInitSelectValue;

  get options() {
    return [
      { label: "New", value: "new" },
      { label: "In Progress", value: "inProgress" },
      { label: "Completed", value: "Completed" },
      { label: "Canceled", value: "canceled" }
    ];
  }

  handleChangeWithInitComboValue(event) {
    this.initComboValue = event.detail.value;
  }

  handleChangeWithoutInitComboValue(event) {
    this.noInitComboValue = event.detail.value;
  }

  handleChangeWithInitSelectValue(event) {
    this.initSelectValue = event.detail.value;
  }

  handleChangeWithoutInitSelectValue(event) {
    this.noInitSelectValue = event.detail.value;
  }
}
