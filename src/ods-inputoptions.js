// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit-element";

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';
// impot the processed CSS file into the scope of the component
import componentProperties from './tokens/componentShapeProperties-css.js';
import styleCss from "./style-css.js";

// build the component class
class OdsInputoptions extends LitElement {
  constructor() {
    super();
    this.value = '';
    this.valueArray = [];
  }

  // function to define props used within the scope of thie component
  static get properties() {
    return {
      disabled:         { type: Boolean },
      horizontal:       { type: Boolean },
      error:            { type: String },
      for:              { type: String },
      label:            { type: String },
      name:             { type: String },
      type:             { type: String },
      value:            { type: String },
      componentData:    { type: Array },
    };
  }

  getInputtype(type) {
    return type === "radio" ? "ods-inputLabel--radio" : 'ods-inputLabel--checkbox'
  }

  getErrorClass(error) {
    if (error) {
      return `errorBorder`
    }
  }

  getHorizontal(horizontal) {
    if (horizontal && this.componentData.length <= 3 ) {
      return 'displayFlex'
    }
  }

  capComponentLoop(type, data) {
    if (type === 'radio' && data.length > 6 ) {
      return true
    }
  }

  handleInput({target}) {
    if (target.checked && this.type === `checkbox`) {
      this.dispatchEvent(new CustomEvent('input', {
        composed: true,
        bubbles: true,
        detail: {
          value: this.valueArray.push(target.value)
        }
      }))
    } else if (this.type === `radio`) {
      if (target.value === this.value) return;
        this.value = target.value;

      this.dispatchEvent(new CustomEvent('input', {
        composed: true,
        bubbles: true,
        detail: {
          value: this.value
        }
      }))
    }

    if (target.checked == false && this.type === `checkbox`) {
      this.valueArray = this.valueArray.filter(item => !target.value.includes(item))
      this.dispatchEvent(new CustomEvent('input', {
        composed: true,
        bubbles: true,
        detail: {
          value: this.valueArray
        }
      }))
    }
  }

  render() {
    return html`
      ${componentProperties}
      ${styleCss}

      ${this.label ?
        html`<label for="${this.for}"class="ods-label">${this.label}</label>` :
        html``}

      ${this.capComponentLoop(this.type, this.componentData) ?

        html`<p class="errorText">Sorry. The max number of options is 6. Please consider an alternative UI component.</p>` :

        html`
          <div @input=${this.handleInput} class="${this.getHorizontal(this.horizontal)}">
            ${this.componentData.map(i => html`
              <div class="ods-inputGroup">
                <input
                  type="${this.type}"
                  ?disabled="${this.disabled}"
                  ?checked="${i.checked}"
                  name="${this.name}"
                  id="${i.id}"
                  value="${i.value}"
                  class="util_displayHiddenVisually ods-inputOption"
                />
                <label for="${i.id}" class="ods-inputLabel ${this.getInputtype(this.type)} ${this.getErrorClass(this.error)}">
                  ${i.label}
                </label>
              </div>
            `)}
          </div>
        `}

      ${this.error ?
        html`<p class="errorText">${this.error}</p>` :
        html``}
    `;
  }
}

// define the name of the custom component
customElements.define("ods-inputoptions", OdsInputoptions);
