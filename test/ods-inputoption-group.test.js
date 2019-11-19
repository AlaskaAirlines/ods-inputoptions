import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../src/ods-inputoption.js';
import '../src/ods-inputoption-group.js';

describe('ods-inputoption-group', () => {
  it('has the expected properties', async () => {
    const expectedError = "Expected error message";
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-group
        horizontal
        error=${expectedError}
        for=${expectedFor}
        label=${expectedLabel}
      ></ods-inputoption-group>
    `);

    const root = el.shadowRoot;
    const label = root.querySelector('label');
    const error = root.querySelector('p');

    expect(el.horizontal).to.be.true;

    expect(label.textContent).be.equal(expectedLabel);
    expect(label.getAttribute('for')).be.equal(expectedFor);

    expect(error.textContent).be.equal(expectedError);
  });

  it('exhibits the correct group checking behavior', async () => {
    const el = await fixture(html`
      <ods-inputoption-group
        for="stateSelection"
        label="Select your state of residence"
      >
        <ods-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
        ></ods-inputoption>

        <ods-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="radio"
          value="washington"
        ></ods-inputoption>
      </ods-inputoption-group>
    `);

    const alaskaRadio = el.querySelector("ods-inputoption[id=alaska]");
    const alaskaRadioInput = alaskaRadio.shadowRoot.querySelector('input');

    const washingtonRadio = el.querySelector("ods-inputoption[id=washington]");
    const washingtonRadioInput = washingtonRadio.shadowRoot.querySelector('input');

    expect(alaskaRadio.checked).to.not.be.true;
    expect(washingtonRadio.checked).to.not.be.true;

    alaskaRadioInput.click();
    await elementUpdated(el);

    // Selecting the first radio button should make it `checked`
    expect(alaskaRadio.checked).to.be.true;
    expect(washingtonRadio.checked).to.not.be.true;

    washingtonRadioInput.click();
    await elementUpdated(el);

    // Selecting the second radio button should make it `checked`
    //   and the first radio button should be `unchecked`
    expect(alaskaRadio.checked).to.not.be.true;
    expect(washingtonRadio.checked).to.be.true;
  });

  it('does not crash for empty input option groups', async () => {
    const el = await fixture(html`
      <ods-inputoption-group>
      </ods-inputoption-group>
    `);

    expect(el._items.length).to.equal(0);
  });
});
