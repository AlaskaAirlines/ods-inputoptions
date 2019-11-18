// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.
// ---------------------------------------------------------------------
import OdsInputoption from "./ods-inputoption.js";

export default class OdsInputoptionLight extends OdsInputoption {
  createRenderRoot() {
    return this;
  }
}

// define the name of the custom component
customElements.define("ods-inputoption-light", OdsInputoptionLight);
