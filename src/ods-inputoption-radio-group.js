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

  _handleClick(event) {
    if (event.path[0].name) {
      console.log(this._items);
      const idx = this._items.indexOf(event.target);
      if (idx !== -1) {
        console.log('calling selectItem');
        this._selectItem(idx, this._index);
      }
    }
  }

  _focusIndex(items) {
    let index = -1;

    index = items.findIndex( (item) => {
      return item.checked;
    });

    if (index === -1) {
      items[0].tabIndex = 0;
    } else {
      this._setCheckedState(index);
    }
  }

  _setCheckedState(index) {
    console.log(`setCheckedState: ${index}`);
    let item = this._items[index];
    item.checked = true;
    item.tabIndex = 0;
    item.focus();
    this._index = index;
    item.dispatchEvent(
      new CustomEvent('toggleEvent', {
        bubbles: true,
        composed: true,
        target: item
      })
    );
  }

  _setUncheckedState(index) {
    console.log(`setUncheckedState: ${index}`);
    let item = this._items[index];
    item.checked = false;
    item.tabIndex = -1;
  }

  _selectItem(newIndex, oldIndex=-1) {
    console.log(`${newIndex}:${oldIndex}`);
    if (oldIndex !== -1 && newIndex !== oldIndex) {
      this._setUncheckedState(oldIndex);
    }
    this._setCheckedState(newIndex);
  }

  _selectItemDispatch(key, index) {
    this._items[index].dispatchEvent(
      new KeyboardEvent(key)
    )
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
