// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import auroInputoptionGroupBase from './auro-component-group-base';

// Import touch detection lib
import 'focus-visible/dist/focus-visible.min.js';

class auroInputoptionCheckboxGroup extends auroInputoptionGroupBase {
  constructor() {
    super();
  }

  static get properties() {
    return {
      ...super.properties
    };
  }
}

// define the name of the custom component
customElements.define("auro-inputoption-checkbox-group", auroInputoptionCheckboxGroup);
