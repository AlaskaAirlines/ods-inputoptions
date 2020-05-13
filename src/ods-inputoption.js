// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { html, supportsAdoptingStyleSheets } from "lit-element";
import OdsInputoptionBase from "./ods-inputoption-base.js";
import styleCss from "./style-css.js";

export default class OdsInputoption extends OdsInputoptionBase {
  static get properties() {
    return {
      ...super.properties
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.type === "checkbox") {
      this.tabIndex = 0;
    }
  }

  getStyles() {
    console.log('getStyles');
    return html`
      ${styleCss}
    `
  }
}

// define the name of the custom component
customElements.define("ods-inputoption", OdsInputoption);
