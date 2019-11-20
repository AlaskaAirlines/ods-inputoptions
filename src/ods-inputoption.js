// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { LitElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import {ifDefined} from 'lit-html/directives/if-defined';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import componentProperties from './tokens/componentShapeProperties-css.js';
import styleCss from "./style-css.js";

export default class OdsInputoption extends LitElement {
  // TODO: rename `id` as this field will be in conflict between the
  // custom element and the <input> element in the light dom.
  static get properties() {
    return {
      checked:  { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      required: { type: Boolean },
      error:    { type: String },
      inputId:  { type: String },
      label:    { type: String },
      name:     { type: String },
      type:     { type: String },
      value:    { type: String },
    };
  }

  handleChange({target}) {
    this.checked = target.checked
  }

  render() {
    let labelClasses = {
      'ods-inputLabel': true,
      'ods-inputLabel--checkbox': this.type === 'checkbox',
      'ods-inputLabel--radio': this.type === 'radio',
      'errorBorder': !!this.error
    }

    return html`
      ${componentProperties}
      ${styleCss}

      <div class="ods-inputGroup">
        <input
          class="util_displayHiddenVisually ods-inputOption"
          @change="${this.handleChange}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .checked="${ifDefined(this.checked)}"
          id="${ifDefined(this.inputId)}"
          name="${ifDefined(this.name)}"
          type="${ifDefined(this.type)}"
          value="${ifDefined(this.value)}"
        />

        <label
          for="${ifDefined(this.inputId)}"
          class="${classMap(labelClasses)}"
        >${this.label}</label>
      </div>
    `;
  }
}

// define the name of the custom component
customElements.define("ods-inputoption", OdsInputoption);
