import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../src/auro-inputoption.js';
import '../src/auro-inputoption-radio-group.js';
import '../src/auro-inputoption-checkbox-group.js';

describe('auro-inputoption-group', () => {
  it('has the expected properties', async () => {
    const expectedError = "Expected error message";
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <auro-inputoption-radio-group
        horizontal
        error=${expectedError}
        for=${expectedFor}
        label=${expectedLabel}
        type="radio"
      ></auro-inputoption-radio-group>
    `);

    const root = el.shadowRoot;
    const label = root.querySelector('label');
    const error = root.querySelector('p');

    expect(el.horizontal).to.be.true;
    expect(label.textContent).be.equal(expectedLabel);
    expect(label.getAttribute('for')).be.equal(expectedFor);
    expect(error.innerText).be.equal(expectedError);
  });

  it('exhibits the correct group checking behavior', async () => {
    const el = await fixture(html`
      <auro-inputoption-radio-group
        for="stateSelection"
        label="Select your state of residence"
        type="radio"
      >
        <auro-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
        ></auro-inputoption>

        <auro-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-inputoption>
      </auro-inputoption-radio-group>
    `);

    const alaskaRadio = el.querySelector("auro-inputoption[id=alaska]");
    const alaskaRadioInput = alaskaRadio.shadowRoot.querySelector('input');

    const washingtonRadio = el.querySelector("auro-inputoption[id=washington]");
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
      <auro-inputoption-checkbox-group
        for="stateSelection"
        label="Select your favorite states"
      >
        <auro-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="checkbox"
          value="alaska"
        ></auro-inputoption>

        <auro-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="checkbox"
          value="washington"
        ></auro-inputoption>
      </auro-inputoption-checkbox-group>
    `);

    const alaskaCheckbox = el.querySelector("auro-inputoption[id=alaska]");
    const alaskaCheckboxInput = alaskaCheckbox.shadowRoot.querySelector('input');

    const washingtonCheckbox = el.querySelector("auro-inputoption[id=washington]");
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
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <auro-inputoption-radio-group
      for=${expectedFor}
      label=${expectedLabel}
      type="radio"
      >
        <auro-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
          checked
        ></auro-inputoption>

        <auro-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-inputoption>

        <auro-inputoption
          id="california"
          label="California"
          name="states"
          type="radio"
          value="california"
        ></auro-inputoption>
      </auro-inputoption-radio-group>
    `);

    const alaskaRadio = el.querySelector("auro-inputoption[id=alaska]");
    const washingtonRadio = el.querySelector("auro-inputoption[id=washington]");
    const californiaRadio = el.querySelector("auro-inputoption[id=california]");

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
    const expectedFor = "labelForId";
    const expectedLabel = "expectedLabel";

    const el = await fixture(html`
      <auro-inputoption-radio-group
      for=${expectedFor}
      label=${expectedLabel}
      type="radio"
      >
        <auro-inputoption
          id="alaska"
          label="Alaska"
          name="states"
          type="radio"
          value="alaska"
          checked
        ></auro-inputoption>

        <auro-inputoption
          id="washington"
          label="Washington"
          name="states"
          type="radio"
          value="washington"
        ></auro-inputoption>
      </auro-inputoption-radio-group>
    `);

    expect(el).to.be.accessible();
  });

  it('does not crash for empty input option groups', async () => {
    const el = await fixture(html`
      <auro-inputoption-radio-group>
      </auro-inputoption-radio-group>

      <auro-inputoption-checkbox-group>
      </auro-inputoption-checkbox-group>
    `);

    expect(el._items.length).to.equal(0);
  });
});
