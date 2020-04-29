// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { LitElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import componentProperties from './tokens/componentShapeProperties-css.js';
import styleCss from "./style-css.js";

export default class OdsInputoptionGroupBase extends LitElement {
  constructor() {
    super();

    this._selectable = 'ods-inputoption'
    this._index = 0;
  }

  static get properties() {
    return {
      disabled:   { type: Boolean },
      horizontal: { type: Boolean },
      error:      { type: String },
      for:        { type: String },
      label:      { type: String },
      type:       { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._items = Array.from(this.querySelectorAll(this._selectable)) || [];

    this._items.forEach(el => el.disabled = this.disabled);
    this._focusIndex(this._items)

    this.addEventListener('click', this._handleClick)
    this.addEventListener('keydown', this._handleKeyDown)
  }

  _errorChange() {
    this._items.forEach(el => el.error = !!this.error);
  }

  render() {
    let groupClasses = {
      'displayFlex': (this.horizontal && this._items.length <= 3)
    }

    return html`
      ${componentProperties}
      ${styleCss}

      ${this._errorChange()}

      ${this.label ?
        html`<label for="${this.for}" class="ods-label">${this.label}</label>` :
        html``}

      <div
        @input="${this._handleInput}"
        class="${classMap(groupClasses)}">
        <slot></slot>
      </div>

      ${this.error ?
        html`<p class="errorText">${this.error}</p>` :
        html``}
    `;
  }
}
