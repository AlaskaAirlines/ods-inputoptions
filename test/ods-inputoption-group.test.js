import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../src/ods-inputoption.js';
import '../src/ods-inputoption-radio-group.js';
import '../src/ods-inputoption-checkbox-group.js';

describe('ods-inputoption-group', () => {
  it('has the expected properties', async () => {
    const expectedError = "Expected error message";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-radio-group
        horizontal
        error=${expectedError}
        label=${expectedLabel}
      ></ods-inputoption-radio-group>
    `);

    const root = el.shadowRoot;
    const label = root.querySelector('legend');
    const error = root.querySelector('p');

    expect(el.horizontal).to.be.true;
    expect(label.textContent).be.equal(expectedLabel);
    expect(error.textContent).be.equal(expectedError);
  });

  it('exhibits the correct group checking behavior', async () => {
    const el = await fixture(html`
      <ods-inputoption-radio-group
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
      </ods-inputoption-radio-group>
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
    // and the first radio button should be `unchecked`
    expect(alaskaRadio.checked).to.not.be.true;
    expect(washingtonRadio.checked).to.be.true;
  });

  it('can select multiple checkboxes', async () => {
    const el = await fixture(html`
      <ods-inputoption-checkbox-group
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
      </ods-inputoption-checkbox-group>
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

  // TODO - Address the event trigger for @input on the parent div not triggering
  // for the automated test in the upcoming Auro work.
  it('supports arrow group traversal', async () => {
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-radio-group
      label=${expectedLabel}
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

        <ods-inputoption
          id="california"
          label="California"
          name="states"
          type="radio"
          value="california"
        ></ods-inputoption>
      </ods-inputoption-radio-group>
    `);

    const alaskaRadio = el.querySelector("ods-inputoption[id=alaska]");
    const washingtonRadio = el.querySelector("ods-inputoption[id=washington]");
    const californiaRadio = el.querySelector("ods-inputoption[id=california]");

    expect(alaskaRadio.checked).to.be.true;
    expect(washingtonRadio.checked).to.not.be.true;
    expect(californiaRadio.checked).to.not.be.true;

    el.dispatchEvent(new KeyboardEvent('keydown', {key: "Down"}));

    await elementUpdated(el);

    expect(alaskaRadio.checked, "Alaska Radio should be false").to.not.be.true;
    expect(washingtonRadio.checked, "Washington Radio should be true").to.be.true;
    expect(californiaRadio.checked, "California Radio should be false").to.not.be.true;
  });

  it('is accessible', async () => {
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <ods-inputoption-radio-group
      label=${expectedLabel}
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
      </ods-inputoption-radio-group>
    `);

    expect(el).to.be.accessible();
  });

  it('does not crash for empty input option groups', async () => {
    const el = await fixture(html`
      <ods-inputoption-radio-group>
      </ods-inputoption-radio-group>

      <ods-inputoption-checkbox-group>
      </ods-inputoption-checkbox-group>
    `);

    expect(el._items.length).to.equal(0);
  });
});
