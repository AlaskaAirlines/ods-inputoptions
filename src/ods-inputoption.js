// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { html } from "lit-element";
import OdsInputoptionBase from "./ods-inputoption-base.js";
import styleCss from "./style-css.js";

export default class OdsInputoption extends OdsInputoptionBase {
  static get properties() {
    return {
      ...super.properties
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.type === "radio") {
      // Safari executes stuff out of order.
      // We one item may have already been set to 0, so don't override it.
      // Set the rest to -1. This achieves the radio butten experience we want.
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute("tabindex", -1);
      }
    } else {
      this.setAttribute("tabindex", 0);
    }
  }

  _setChecked({ target }) {
    this.checked = target.checked
  }

  getStyles() {
    return html`
      ${styleCss}
    `
  }
}

// define the name of the custom component
customElements.define("ods-inputoption", OdsInputoption);
