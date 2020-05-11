// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import OdsInputoptionGroupBase from './ods-inputoption-group-base';

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
    if (this._items.length > 0) {
      this._focusIndex(this._items);
    }

    this.addEventListener('click', this._handleClick)
    this.addEventListener('keydown', this._handleKeyDown)
  }

  _handleClick({target}) {
    const idx = this._items.indexOf(target);

    if (idx !== -1) {
      this._selectItem(idx, this._index);
    }
  }

  _focusIndex(items) {
    let index = -1;

    index = items.findIndex( (item) => {
      return item.hasAttribute('checked');
    });
    
    if (index === -1) {
      items[0].setAttribute('tabindex', "0");
    } else {
      this._setCheckedState(index);
    }
  }

  _setCheckedState(index) {
    let item = this._items[index];
    item.setAttribute('checked', '');
    item.setAttribute('tabindex', 0);
    item.focus();
    this._index = index;
  }

  _setUncheckedState(index) {
    let item = this._items[index];
    item.setAttribute('tabindex', -1);
    item.removeAttribute('checked');
  }

  _selectItem(newIndex, oldIndex=-1) {
    if (oldIndex !== -1) {
      this._setUncheckedState(oldIndex);
    }
    this._setCheckedState(newIndex);
  }

  _handleKeyDown(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case " ":
      case "32":
        event.preventDefault();
        this._selectItem(this._index);
        break;

      case "Down":
      case "ArrowDown":
      case "Right":
      case "ArrowRight": 
      case "39":
      case "40": {
        event.preventDefault();
        let index = this._index === this._items.length - 1 ? 0 : this._index + 1;
        this._selectItem(index, this._index);
        break;
      }

      case "Up":
      case "ArrowUp":
      case "Left":
      case "ArrowLeft": 
      case "37": 
      case "38": {
        event.preventDefault();
        let index = this._index === 0 ? this._items.length - 1 : this._index - 1;
        this._selectItem(index, this._index);
        break;
      }
    }
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-radio-group", OdsInputoptionRadioGroup);
