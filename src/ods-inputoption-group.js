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

class OdsInputoptionGroup extends LitElement {
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

  _handleClick({target}) {
    const idx = this._items.indexOf(target)

    if (idx !== -1 && this._items[idx].type === "radio") {
      this._selectItem(idx)
    }
  }

  _focusIndex(items) {
    let index = 0;
    let checked = false;

    items.forEach((el, idx) => {
      el.setAttribute('tabindex', '-1')

      if (el.checked) {
        index = idx;
        checked = true;
      }
    })

    this._selectItem(index, checked);
  }

  _selectItem(newIndex, checked=true) {
    let oldIndex = this._index;
    newIndex = newIndex % this._items.length;
    newIndex = (newIndex < 0) ? this._items.length - 1 : newIndex;

    if (this._items[oldIndex]) this._items[oldIndex].setAttribute("tabindex", "-1");
    if (this._items[newIndex]) this._items[newIndex].setAttribute("tabindex", "0");

    if (checked) {
      this.focus();
      const label = this._items[newIndex].renderRoot.querySelector('label');
      if (label) label.click();
    }

    this._index = newIndex
  }

  _selectCheckBoxItem(newIndex) {
    let oldIndex = this._index;
    
    if (this._index > 0 && this._index < this._items.length - 1) {
      if (this._items[oldIndex]) this._items[oldIndex].setAttribute("tabindex", "-1");
      if (this._items[newIndex]) {
        this._items[newIndex].setAttribute("tabindex", "0");
        this._items[newIndex].focus()
      }

      this._index = newIndex;
    }
  }

  _handleKeyDown(event) {
    if (event.key === "Tab" && this._items[this._index].type === "checkbox") {
      let newIndex = this._index + (event.shiftKey? -1 : 1);
      this._selectCheckBoxItem(newIndex);
    } else {
      switch (event.key) {
        case "Down":
        case "ArrowDown":
        case "Right":
        case "ArrowRight": {
          event.preventDefault();
          this._selectItem(this._index + 1);
          break;
        } 
  
        case "Up":
        case "ArrowUp":
        case "Left":
        case "ArrowLeft": {
          event.preventDefault();
          this._selectItem(this._index - 1);
          break;
        }
      }
    }
  }

  _handleInput({ target }) {
    if (this.type === "radio") {
      this._items.forEach(el => {
        el === target ?
          el.setAttribute('checked', '') :
          el.removeAttribute('checked');
      });
    }
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

// define the name of the custom component
customElements.define("ods-inputoption-group", OdsInputoptionGroup);
