// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import OdsInputoptionGroupBase from './ods-component-group-base';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

class OdsInputoptionRadioGroup extends OdsInputoptionGroupBase {
  constructor() {
    super();
  }

  static get properties() {
    return {
      ...super.properties
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this._focusIndex(this._items)
    this.addEventListener('click', this._handleClick)
    this.addEventListener('keydown', this._handleKeyDown)
  }

  _handleClick({target}) {
    const idx = this._items.indexOf(target)

    if (idx !== -1) {
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

  _handleKeyDown(event) {
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

  _handleInput({ target }) {
    this._items.forEach(el => {
      el === target ?
        el.setAttribute('checked', '') :
        el.removeAttribute('checked');
    });
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-radio-group", OdsInputoptionRadioGroup);
