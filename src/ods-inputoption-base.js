// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { LitElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import {ifDefined} from 'lit-html/directives/if-defined';
import 'focus-visible/dist/focus-visible.min.js';
import componentProperties from './tokens/componentShapeProperties-css.js';

export default class OdsInputoptionBase extends LitElement {
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

  render() {
    let labelClasses = {
      'ods-inputLabel': true,
      'ods-inputLabel--checkbox': this.type === 'checkbox',
      'ods-inputLabel--radio': this.type === 'radio',
      'errorBorder': !!this.error
    }

    return html`
      ${componentProperties}
      ${this.getStyles()}

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
