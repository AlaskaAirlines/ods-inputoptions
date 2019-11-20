// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import OdsInputoption from "./ods-inputoption.js";

export default class OdsInputoptionLight extends OdsInputoption {
  createRenderRoot() {
    return this;
  }

  handleChange({ target }) {
    /* Override `handleChange` in the light dom element; this will allow
     *   the <input> element to manage the checked state and will prevent
     *   <ods-inputoption-light> elements from receiving the `checked`
     *   attribute when they are checked by the user. In the shadow dom
     *   element, the `checked` attribute is removed by the group element
     *   when a different radio button in the same group is selected.
     */
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-light", OdsInputoptionLight);
