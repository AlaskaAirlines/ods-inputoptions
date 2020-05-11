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
    console.log("radio group connectedCallback");
    super.connectedCallback();
    this._focusIndex(this._items);

    this.addEventListener('click', this._handleClick)
    this.addEventListener('keydown', this._handleKeyDown)
  }

  _handleClick({target}) {
    console.log("handleClick");
    const idx = this._items.indexOf(target);

    if (idx !== -1) {
      this._selectItem(idx);
    }
  }

  _focusIndex(items) {
    console.log("focusIndex");
    let index = 0;
    let checked = false;

    index = items.findIndex( (item) => {
      return item.getAttribute('checked' === "true");
    });

    console.log(index);

    if (index === -1) {
      items[0].setAttribute('tabindex', 0);
    } else {
      items[index].setAttribute('tabindex', 0);
      checked = true;
    } 

    this._selectItem(0, checked);
  }

  _selectItem(newIndex, checked=true) {
    console.log("selectItem");
    if (checked) {
      this.focus();
      const label = this._items[newIndex].renderRoot.querySelector('label');
      if (label) label.click();
    }

    this._index = newIndex
  }

  _handleKeyDown(event) {
    console.log(`handleKeyDown: ${event.key}`);
    switch (event.key) {
      case "Down":
      case "ArrowDown":
      case "Right":
      case "ArrowRight": {
        event.preventDefault();
        let index = this._index === this._items.length - 1 ? 0 : this._index + 1;
        this._selectItem(index);
        break;
      }

      case "Up":
      case "ArrowUp":
      case "Left":
      case "ArrowLeft": {
        event.preventDefault();
        let index = this._index === 0 ? this._items.length - 1 : this._index - 1;
        this._selectItem(index);
        break;
      }
    }
  }

  _updateCheckedIndex({ target }) {
    console.log("updateCheckedIndex");
    /**
     * This feature only sets the tabindex AFTER a user has tabbed into
     * the block of elements and sets the checked value.
     */
    this._items.forEach(el => {
      el === target ?
        el.setAttribute('checked', '') :
        el.removeAttribute('checked');

      el === target ?
        el.setAttribute('tabindex', '0') :
        el.setAttribute('tabindex', '-1');
    });
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-radio-group", OdsInputoptionRadioGroup);
