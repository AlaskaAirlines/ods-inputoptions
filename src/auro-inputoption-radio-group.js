// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import auroInputoptionGroupBase from './auro-component-group-base';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

class auroInputoptionRadioGroup extends auroInputoptionGroupBase {
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
    const idx = this._items.indexOf(target);

    if (idx !== -1) {
      this._selectItem(idx);
    }
  }

  _focusIndex(items) {
    let index = 0;
    let tabbed = false;

    items.forEach((el) => {

      // variable for elements within the array with checked="true"
      const trueElement = el.getAttribute('checked') === "true";

      // test for checked="true"
      const _focusedIndex = (item) => {
        return item.getAttribute('checked') === "true";
      }

      /**
       * This statement looks to see if elements in the array
       * are preset to checked="true" and sets the tabindex="0"
       * and all others to tabindex="-1"
       *
       * This allows for the first tab into a group to associate directly
       * with the checked element.
       *
       * Additionally this reset the index variable to the
       * preselected index to allow for arrow tabbing between elements.
       */
      if (trueElement) {
        items.forEach((el) => {

          if (trueElement) {
            el.setAttribute('tabindex', '0');
            index = items.findIndex(_focusedIndex)
          }

          if (!el.getAttribute('checked')) {
            el.setAttribute('tabindex', '-1')
          }
        })
      }
    });

    items.forEach((el, idx) => {

      if (el.tabbed) {
        index = idx;
        tabbed = true;
      }
    });

    this._selectItem(index, tabbed);
  }

  _selectItem(newIndex, tabbed=true) {

    if (tabbed) {
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

  _updateCheckedIndex({ target }) {
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
customElements.define("auro-inputoption-radio-group", auroInputoptionRadioGroup);
