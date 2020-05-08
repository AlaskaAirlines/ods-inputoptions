// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { LitElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import {ifDefined} from 'lit-html/directives/if-defined';
import 'focus-visible/dist/focus-visible.min.js';

export default class auroInputoptionBase extends LitElement {
  static get properties() {
    return {
      checked:  { type: Boolean, reflect: true },
      disabled: { type: Boolean },
      error:    { type: String },
      id:       { type: String },
      label:    { type: String },
      name:     { type: String },
      type:     { type: String },
      value:    { type: String },
    };
  }

  render() {
    let labelClasses = {
      'auro-inputLabel': true,
      'auro-inputLabel--checkbox': this.type === 'checkbox',
      'auro-inputLabel--radio': this.type === 'radio',
      'errorBorder': !!this.error
    }

    return html`
      ${this.getStyles()}

      <div class="auro-inputGroup">
        <input
          class="util_displayHiddenVisually auro-inputOption"
          @input="${this._setChecked}"
          ?disabled="${this.disabled}"
          .checked="${ifDefined(this.checked)}"
          id="${ifDefined(this.id)}"
          name="${ifDefined(this.name)}"
          type="${ifDefined(this.type)}"
          .value="${ifDefined(this.value)}"
        />

        <label
          for="${ifDefined(this.id)}"
          class="${classMap(labelClasses)}"
        >${this.label}</label>
      </div>
    `;
  }
}
