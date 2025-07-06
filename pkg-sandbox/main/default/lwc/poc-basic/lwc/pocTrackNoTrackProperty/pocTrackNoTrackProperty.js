import { LightningElement, track } from "lwc";

export default class PocTrackNoTrackProperty extends LightningElement {
  @track string1 = "Hello";
  string2 = "Hello";
  // no difference for track / no track simple properties

  // big difference for track / no track object properties -- object reference vs object value.
  // Component will be only re-rendered when the object reference is updated for no track object properties.
  // However
  // the no track object might be updated due to the effect of no-tracked simple properties' values updated -- side effect.
  @track object1 = {
    firstName: "John",
    lastName: "Doe"
  };

  object2 = {
    firstName: "John",
    lastName: "Doe"
  };

  #lastAction;

  connectedCallback() {
    console.log("connectedCallback after: " + this.#lastAction);
  }

  renderedCallback() {
    console.log("renderedCallback after: " + this.#lastAction);
  }

  disconnectedCallback() {
    console.log("disconnectedCallback after: " + this.#lastAction);
  }

  handleNoTrackObjectValueUpdated(event) {
    this.#lastAction = event.target.label;
    console.log("expecting screen not updated");
    // expected screen not updated: since object2 is not tracked, the component will not be re-rendered
    this.object2.firstName = "Jane - value updated";
    this.object2.lastName = "Smith - value updated";
  }

  handleNoTrackObjectReferenceUpdated(event) {
    this.#lastAction = event.target.label;
    console.log("expecting screen updated");
    this.object2 = {
      firstName: "Jane - ref updated",
      lastName: "Smith - ref updated"
    };
  }

  handleTrackObjectValueUpdated(event) {
    this.#lastAction = event.target.label;
    // expected screen updated: since object1 is not tracked, the component will be re-rendered. For track object, its nested properties will be tracked too.
    this.object1.firstName = "Jane - value updated";
    this.object1.lastName = "Smith - value updated";
  }

  handleTrackObjectReferenceUpdated(event) {
    this.#lastAction = event.target.label;
    this.object1 = {
      firstName: "Jane - ref updated",
      lastName: "Smith - ref updated"
    };
  }

  handleAllObjectValueUpdated(event) {
    this.#lastAction = event.target.label;
    this.string1 = "Hi - value updated";
    this.string2 = "Hi - value updated";
    this.object1.firstName = "Jane - value updated";
    this.object1.lastName = "Smith - value updated";
    this.object2.firstName = "Jane - value updated";
    this.object2.lastName = "Smith - value updated";
  }

  handleAllObjectReferenceUpdated(event) {
    this.#lastAction = event.target.label;
    this.string1 = "Hi - reference updated";
    this.string2 = "Hi - reference updated";
    this.object1 = {
      firstName: "Jane - ref updated",
      lastName: "Smith - ref updated"
    };
    this.object2 = {
      firstName: "Jane - ref updated",
      lastName: "Smith - ref updated"
    };
  }

  handleMixedTrackNoTrackObjectValueUpdated(event) {
    this.#lastAction = event.target.label;
    this.object1.firstName = "Jane - value updated"; // tracked object property
    this.object1.lastName = "Smith - value updated";
    this.object2.firstName = "Jane - value updated"; // no track object property
    this.object2.lastName = "Smith - value updated";
  }

  handleMixedNoTrackObjectSimpleValueUpdated(event) {
    this.#lastAction = event.target.label;
    // expected screen update: since string2 is primary, no matter track/no track, the component will be re-rendered
    // when re-rendering, object2 will have the latest values
    this.string2 = "Hi - mixed no track object and no track simple value"; // no track simple property
    this.object2.firstName = "Jane - value updated"; // no track object property
    this.object2.lastName = "Smith - value updated";
  }

  handleMixedNoTrackObjectTrackSimpleValueUpdated(event) {
    this.#lastAction = event.target.label;
    // expected screen update: since string1 is primary, no matter track/no track, the component will be re-rendered
    // when re-rendering, object2 will have the latest values
    this.string1 = "Hi - mixed no track object and track simple value"; // track simple property
    this.object2.firstName = "Jane - value updated"; // no track object property
    this.object2.lastName = "Smith - value updated";
  }

  handleReset(event) {
    this.#lastAction = event.target.label;
    this.string1 = "Hello";
    this.string2 = "Hello";
    this.object1 = {
      firstName: "John",
      lastName: "Doe"
    };
    this.object2 = {
      firstName: "John",
      lastName: "Doe"
    };
  }
}
