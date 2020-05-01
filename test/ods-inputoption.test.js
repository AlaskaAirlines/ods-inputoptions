import { fixture, html, expect, elementUpdated } from '@open-wc/testing';

import '../src/ods-inputoption.js';

describe('ods-inputoption', () => {
  it('sets internal element properties', async () => {
    const expectedError = "The expected error message";
    const expectedId = "componentId";
    const expectedLabel = "The expected label";
    const expectedName = "expectedName";
    const type = "radio";
    const expectedValue = "expectedValue";

    const el = await fixture(html`
      <ods-inputoption
        checked
        error=${expectedError}
        id=${expectedId}
        label=${expectedLabel}
        name=${expectedName}
        type=${type}
        value=${expectedValue}
      ></ods-inputoption>
    `);

    const root = el.shadowRoot;
    const inputElement = root.querySelector('input');
    const labelElement = root.querySelector('label');

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

  it('checks the checkbox and reflects the attribute', async () => {
    const error = "The expected error message";
    const id = "componentId";
    const label = "The label";
    const name = "theName";
    const type = "radio";
    const value = "value";

    const el = await fixture(html`
      <ods-inputoption
        required
        error=${error}
        id=${id}
        label=${label}
        name=${name}
        type=${type}
        value=${value}
      ></ods-inputoption>
    `);

    const root = el.shadowRoot;
    const input = root.querySelector('input');

    expect(el.checked).to.not.be.true;

    input.click();
    await elementUpdated(el);

    expect(el.checked).to.be.true;
    expect(el.hasAttribute('checked')).to.be.true;
  });

  it('is unable to be check when disabled', async () => {
    const type = "radio";

    const el = await fixture(html`
      <ods-inputoption
        disabled
        type=${type}
      ></ods-inputoption>
    `);

    const root = el.shadowRoot;
    const input = root.querySelector('input');

    expect(el.checked).to.not.be.true;

    input.click();
    await elementUpdated(el);

    expect(el.checked).to.not.be.true;
  });
});
