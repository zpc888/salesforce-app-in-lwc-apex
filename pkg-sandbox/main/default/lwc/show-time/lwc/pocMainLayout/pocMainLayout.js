import { LightningElement } from "lwc";
import { mix } from "c/p0Funcs";
import { MixinPageBase } from "c/p2WidgetMixin";

export default class PocMainLayout extends mix(LightningElement).with(
  MixinPageBase
) {}
