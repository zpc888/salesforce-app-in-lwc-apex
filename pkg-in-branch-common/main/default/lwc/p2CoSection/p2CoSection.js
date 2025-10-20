import { LightningElement, api } from "lwc";

import IMAGES_URL from "@salesforce/resourceUrl/p2Images";

import { isNotEmpty, mix, deepMerge } from "c/p0Funcs";
import { MixinLangAware } from "c/p0WidgetMixin";
import { en, fr } from "./p2CoSection-i18n";

export default class P2CoSection extends mix(LightningElement).with(
  MixinLangAware
) {
  @api sectionTitle;
  @api sectionSubtitle;
  @api toggleState = "expanded"; // "expanded" or "collapsed" or "none" = not allowed

  initialized = false;
  bound = {
    dragstart: null,
    dragover: null,
    drop: null,
    dragend: null
  };

  _toExpandedIconUrl = `${IMAGES_URL}/chevron-down.svg`;
  _toCollapsedIconUrl = `${IMAGES_URL}/chevron-up.svg`;
  sectionHeaderIcon = `${IMAGES_URL}/action-list.svg`;

  enrichedFr = deepMerge(fr, en);

  get i18n() {
    return this.isFrench() ? this.enrichedFr : en;
  }

  get toggleIcon() {
    return this.isExpanded ? this._toCollapsedIconUrl : this._toExpandedIconUrl;
  }

  get toggleAriaLabel() {
    return this.isExpanded
      ? this.i18n.collapseSectionAriaLabel
      : this.i18n.expandSectionAriaLabel;
  }

  get hasSubtitle() {
    return isNotEmpty(this.sectionSubtitle);
  }

  get isExpanded() {
    return this.toggleState === "expanded";
  }

  get isCollapsed() {
    return this.toggleState === "collapsed";
  }

  get hasToggle() {
    return this.toggleState !== "none";
  }

  get isBodyVisible() {
    // expanded or none (no toggle at all)
    return this.toggleState !== "collapsed";
  }

  renderedCallback() {
    if (!this.initialized) {
      this.initialized = true;
      // initial attach if there are already slotted elements
      this.attachDragHandlers();
    }
  }

  handleSlotChange() {
    this.attachDragHandlers();
  }

  toggleSection() {
    if (this.toggleState === "expanded") {
      this.toggleState = "collapsed";
    } else if (this.toggleState === "collapsed") {
      this.toggleState = "expanded";
    }
  }

  attachDragHandlers() {
    const slot = this.template.querySelector("slot:not([name])");
    if (!slot) return;

    console.log("Attaching drag handlers");
    this.removeDragHandlers();

    // get assigned elements and filter to the direct components with .p-dnd
    const items = slot.assignedElements({ flatten: false }).filter((el) => {
      // return el && el.tagName && el.tagName.toLowerCase().startsWith('c-p2-co-box');
      return el && el.classList && el.classList.contains("p-dnd");
    });

    console.log(`Found ${items.length} draggable items`);

    // set draggable and attach handlers
    items.forEach((el, idx) => {
      el.setAttribute("draggable", "true");
      el.dataset.draggableIndex = idx;

      // bind handlers once and keep references so we can remove later
      const dragstart = (ev) => this.handleDragStart(ev, idx);
      const dragover = (ev) => this.handleDragOver(ev, idx);
      const drop = (ev) => this.handleDrop(ev, idx);
      const dragend = (ev) => this.handleDragEnd(ev, idx);

      el.addEventListener("dragstart", dragstart);
      el.addEventListener("dragover", dragover);
      el.addEventListener("drop", drop);
      el.addEventListener("dragend", dragend);

      // store bound handlers so they can be removed later
      if (!this.bound[idx]) this.bound[idx] = {};
      this.bound[idx] = { dragstart, dragover, drop, dragend };
    });
  }

  removeDragHandlers() {
    const slot = this.template.querySelector("slot");
    if (!slot) return;
    const items = slot.assignedElements({ flatten: false }).filter((el) => {
      return el && el.classList && el.classList.contains("p-dnd");
    });

    items.forEach((el, idx) => {
      const handlers = this.bound[idx];
      if (handlers) {
        el.removeEventListener("dragstart", handlers.dragstart);
        el.removeEventListener("dragover", handlers.dragover);
        el.removeEventListener("drop", handlers.drop);
        el.removeEventListener("dragend", handlers.dragend);
      }
      el.removeAttribute("draggable");
      delete el.dataset.draggableIndex;
      delete this.bound[idx];
    });
  }

  // allow dropping on container (to append)
  handleContainerDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  }

  handleContainerDrop(evt) {
    evt.preventDefault();
    const fromIndex = parseInt(evt.dataTransfer.getData("text/plain"), 10);
    console.log(`Container drop from index ${fromIndex}`);
    if (Number.isNaN(fromIndex)) return;

    // append to end
    const slot = this.template.querySelector("slot:not([name])");
    const items = slot
      .assignedElements({ flatten: false })
      .filter((el) => el && el.classList && el.classList.contains("p-dnd"));
    const toIndex = items.length - 1; // will insert before last item; parent can decide exact position
    console.log(`Container drop to index ${toIndex}`);
    // this.emitReorder(fromIndex, toIndex);
  }

  handleDragStart(evt, idx) {
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("text/plain", String(idx));
    evt.currentTarget.classList.add("dragging");
    // small data so some browsers allow dragging
    try {
      evt.dataTransfer.setData("text/html", evt.currentTarget.outerHTML);
    } catch (e) {}
  }

  handleDragOver(evt, idx) {
    evt.preventDefault(); // required to allow drop
    evt.dataTransfer.dropEffect = "move";
    // visual cue
    const target = evt.currentTarget;
    target.classList.add("drag-over");
  }

  handleDrop(evt, idx) {
    evt.preventDefault();
    const fromIndex = parseInt(evt.dataTransfer.getData("text/plain"), 10);
    const toIndex = idx;
    console.log(`Container drop 2 from index ${fromIndex} to index ${toIndex}`);
    if (!Number.isNaN(fromIndex) && fromIndex !== toIndex) {
      this._emitReorder(fromIndex, toIndex);
    }
    // cleanup visual classes
    const target = evt.currentTarget;
    target.classList.remove("drag-over");
  }

  handleDragEnd(evt) {
    // cleanup any visual state on end
    const el = evt.currentTarget;
    el.classList.remove("dragging");
    el.classList.remove("drag-over");
  }

  _emitReorder(fromIndex, toIndex) {
    // dispatch a composed, bubbling event so parent components can catch it
    this.dispatchEvent(
      new CustomEvent("reorder", {
        detail: { fromIndex, toIndex },
        bubbles: true,
        composed: true
      })
    );
    // reattach handlers because indices changed
    // small timeout allows parent to update DOM first if they do synchronous changes
    // setTimeout(() => this.attachDragHandlers(), 0);
  }
}
