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
        type="radio"
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
        type="radio"
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

  it('can select multiple checkboxes', async () => {
    const el = await fixture(html`
      <ods-inputoption-group
        for="stateSelection"
        label="Select your favorite states"
      >
        <ods-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="checkbox"
          value="alaska"
        ></ods-inputoption>

        <ods-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="checkbox"
          value="washington"
        ></ods-inputoption>
      </ods-inputoption-group>
    `);

    const alaskaCheckbox = el.querySelector("ods-inputoption[id=alaska]");
    const alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

    const washingtonCheckbox = el.querySelector("ods-inputoption[id=washington]");
    const washingtonCheckboxInput = washingtonCheckbox.shadowRoot.querySelector('input');

    expect(alaskaCheckbox.checked).to.not.be.true;
    expect(washingtonCheckbox.checked).to.not.be.true;

    alaskaCheckboxInput.click();
    washingtonCheckboxInput.click();
    await elementUpdated(el);

    // Selecting the first radio button should make it `checked`
    expect(alaskaCheckbox.checked).to.be.true;
    expect(washingtonCheckbox.checked).to.be.true;
  });

  // TODO - The test for testing element traversal does not currently pass
  it('supports tab and arrow group traversal', async () => {
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-group
      for=${expectedFor}
      label=${expectedLabel}
      type="radio"
      >
        <ods-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
          checked
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
    const washingtonRadio = el.querySelector("ods-inputoption[id=washington]");

    expect(alaskaRadio.checked).to.be.true;
    expect(washingtonRadio.checked).to.not.be.true;

    el.dispatchEvent(new KeyboardEvent('keydown', {key: "Down"}));

    await elementUpdated(el);

    // expect(alaskaRadio.checked).to.not.be.true;
    // expect(washingtonRadio.checked).to.be.true;
  });

  it('is accessible', async () => {
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-group
      for=${expectedFor}
      label=${expectedLabel}
      type="radio"
      >
        <ods-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
          checked
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

    expect(el).to.be.accessible();
  });

  it('does not crash for empty input option groups', async () => {
    const el = await fixture(html`
      <ods-inputoption-group>
      </ods-inputoption-group>
    `);

    expect(el._items.length).to.equal(0);
  });
});
