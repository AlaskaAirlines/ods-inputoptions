// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import { LitElement, html } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import errorIcon from '@alaskaairux/icons/dist/icons/alert/error_es6.js';
import iconProperties from '@alaskaairux/icons/dist/tokens/CSSTokenProperties-css.js';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

// Import the processed CSS file into the scope of the component
import styleCss from "./style-css.js";

export default class AuroInputoptionGroupBase extends LitElement {
  constructor() {
    super();
    this.dom = new DOMParser().parseFromString(errorIcon.svg, 'text/html');
    this.svg = this.dom.body.firstChild;
    this.svg.setAttribute("viewBox", "0 -5 24 24");
    this._selectable = 'auro-inputoption'
    this._index = 0;
  }

  static get properties() {
    return {
      horizontal: { type: Boolean },
      ondark:     { type: Boolean },
      error:      { type: String },
      for:        { type: String },
      label:      { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._items = Array.from(this.querySelectorAll(this._selectable)) || [];

  }

  _errorChange() {
    this._items.forEach(el => el.error = !!this.error);
  }

  // function to replicate a11y feature of tapping on label for the option group
  _labelClick() {
    for (let child of this.children) {
      if (child.id === `${this.for}`) {
        if (child.getAttribute('checked') === null) {
          child.setAttribute('checked', '')
        } else if (child.getAttribute('checked') === '' && child.getAttribute('type') === 'checkbox') {
          child.removeAttribute('checked')
        }
      } else if (child.id != `${this.for}`) {
        child.removeAttribute('checked')
      }
    }
  }


  render() {
    let groupClasses = {
      'displayFlex': (this.horizontal && this._items.length <= 3),
    }

    let labelClasses = {
      'auro-label': true,
      'auro-labelOndark': this.ondark,
    }

    let errorClasses = {
      'errorText': true,
      'errorTextOndark': this.ondark,
    }
 
    return html`
      ${styleCss}
      ${iconProperties}

      ${this._errorChange()}

      ${this.label ?
        html`<label for="${this.for}" @click="${this._labelClick}" class="${classMap(labelClasses)}">${this.label}</label>` :
        html``}

      ${this.error ?
        html`<p class="${classMap(errorClasses)}">${this.svg}${this.error}</p>` :
        html``}

      <div
        @input="${this._updateCheckedIndex}"
        class="${classMap(groupClasses)}">
        <slot></slot>
      </div>
    `;
  }
}
