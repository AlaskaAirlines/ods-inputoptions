// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { html } from "lit-element";
import OdsInputoptionBase from "./ods-inputoption-base.js";
import 'focus-visible/dist/focus-visible.min.js';
import styleCss from "./style-ld-css.js";

export default class OdsInputoptionLight extends OdsInputoptionBase {
  static get properties() {
    return {
      ...super.properties
    }
  }
  
  createRenderRoot() {
    return this;
  }

  getStyles() {
    return html`
      ${styleCss}
    `
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-light", OdsInputoptionLight);
