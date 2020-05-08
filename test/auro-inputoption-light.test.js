import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../src/auro-inputoption-light.js';

describe('auro-inputoption-light', () => {
  it('sets internal element properties', async () => {
    const expectedError = "The expected error message";
    const expectedId = "componentId";
    const expectedLabel = "The expected label";
    const expectedName = "expectedName";
    const type = "radio";
    const expectedValue = "expectedValue";

    const el = await fixture(html`
      <auro-inputoption-light
        checked
        error=${expectedError}
        id=${expectedId}
        label=${expectedLabel}
        name=${expectedName}
        type=${type}
        value=${expectedValue}
      ></auro-inputoption-light>
    `);

    const inputElement = el.querySelector('input');
    const labelElement = el.querySelector('label');

    expect(el.shadowRoot).to.be.null;
    expect(el.error).to.equal(expectedError);

    expect(inputElement.disabled).to.not.be.true;
    expect(inputElement.checked).to.be.true;
    expect(inputElement.id).to.equal(expectedId);
    expect(inputElement.name).to.equal(expectedName);
    expect(inputElement.type).to.equal(type);
    expect(inputElement.value).to.equal(expectedValue);

    expect(labelElement.getAttribute('for')).to.equal(expectedId);
    expect(labelElement.textContent).to.equal(expectedLabel);
  });

  it('uses the input radio group behavior', async () => {
    const el = await fixture(html`
      <div>
        <auro-inputoption-light
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
        ></auro-inputoption-light>

        <auro-inputoption-light
          id="washington"
          label="Washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-inputoption-light>
      </div>
    `);

    const alaskaRadioInput = el.querySelector("auro-inputoption-light[id=alaska] input");
    const washingtonRadioInput = el.querySelector("auro-inputoption-light[id=washington] input");

    alaskaRadioInput.click();
    await elementUpdated(el);

    // Selecting the first radio button should make it `checked`
    expect(alaskaRadioInput.checked).to.be.true;
    expect(washingtonRadioInput.checked).to.not.be.true;

    washingtonRadioInput.click();
    await elementUpdated(el);

    // Selecting the second radio button should make it `checked`
    //   and the first radio button should be `unchecked`
    expect(alaskaRadioInput.checked).to.not.be.true;
    expect(washingtonRadioInput.checked).to.be.true;
  });
});
