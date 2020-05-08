[![Build Status](https://travis-ci.org/AlaskaAirlines/auro-inputoptions.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/auro-inputoptions)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/auro-inputoptions.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/auro-inputoptions.svg?color=blue)

# auro-inputoption

`<auro-inputoption>` is a wrapper component for a HTML `<input type"checkbox">` or `<input type"radio">` elements containing styling and behavior.

## Docs

All information regarding Project Setup, Technical Details, Tests and information regarding auro Stateless Components can be found in the [./docs](https://github.com/AlaskaAirlines/auro_docs/blob/master/README.md) repository.

## Install

```shell
$ npm i @alaskaairux/auro-inputoptions
```

### Design Token CSS Custom Property dependency

The use of any auro Component has a dependency on the [auro Design Tokens (npm install)](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens). See repository and API information [here](https://github.com/AlaskaAirlines/OrionDesignTokens#orion-design-tokens).

For additional details in regards to using Orion Design Tokens with components, please see [./docs/TECH_DETAILS.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md#building-resources-from-orion-design-tokens)

### CSS Custom Property fallbacks

CSS Custom Properties are not supported in older browsers. For this, fallback properties are pre-generated and included with the npm. Any update to the Orion Design Tokens will be immediately reflected with browsers that support CSS Custom Properties, legacy browsers will require updated components with pre-generated fallback properties.

### Define dependency in project component

Define the component dependency within each component that is using the \<auro-inputoptions> component.

```javascript
import "@alaskaairux/auro-inputoptions";
```

**Reference component in HTML**

```html
<auro-inputoption></auro-inputoption>
```

See additional examples below.

## Element auro-inputoption

### inputoption use cases

The `<auro-inputoptions>` element should be used in situations where users may:

* Want an element that can be turned on and off.
* Have a collections of radio buttons describing a set of related options
* Require users to check an options

### inputoption groups 

Using auro-inputoption required a group wrapper. Depending on wether the intention is to use radio buttons or checkboxes, depends on the group used. 

For radio buttons, use:

```html
<auro-inputoption-radio-group for="radioDemo1" label="Form label goes here">
  <auro-inputoption inputid="radio1" label="Yes" type="radio"></auro-inputoption>
  <auro-inputoption inputid="radio2" label="No" type="radio"></auro-inputoption>
</auro-inputoption-radio-group>
``` 

For checkboxes, use:

```html
<auro-inputoption-checkbox-group for="checkboxDemo1" label="Form label goes here" horizontal>
  <auro-inputoption inputid="computers" label="Computers" name="checkboxDemo2" type="checkbox" value="computers"></auro-inputoption>
  <auro-inputoption inputid="music" label="Music" name="checkboxDemo2" type="checkbox" value="music"></auro-inputoption>![]()
</auro-inputoption-checkbox-group>
``` 

### Properties: inputoption group

| Attribute | Value type | Description |
|----|----|----|
| disabled | boolean | enables disabled state of the element |
| error | string | set error message for button/checkbox group |
| for | string | sets the `for` attribute for button/checkbox group label |
| horizontal | boolean | toggles layout direction, default is `vertical`, max 3 options |
| label | string | sets content for button/checkbox group label |

### Properties: inputoption

| Attribute | Value type | Description |
|----|----|----|
| checked | boolean | `checked="true"` | 
| id | string | sets the individual `id` per element |
| label | string | sets content for button/checkbox label |
| name | string | Accepts any string, `DOMString` representing the value of the input |
| type | string | Accepts `radio` or `checkbox` to assume functional type |
| value | string | sets the elements input value |

## Examples 

The following examples illustrate the use of `auro-inputoption` within the scope of either `auro-inputoption-checkbox-group` or `auro-inputoption-radio-group`.

### Default radio button group

```html
<auro-inputoption-radio-group for="radio1" label="Form label goes here">
  <auro-inputoption id="radio1" label="Yes" name="radioDemo1" type="radio" value="yes"></auro-inputoption>
  <auro-inputoption id="radio2" label="No" name="radioDemo1" type="radio" value="no"></auro-inputoption>
  <auro-inputoption id="radio3" label="Maybe" name="radioDemo1" type="radio" value="maybe"></auro-inputoption>
</auro-inputoption-radio-group>
```

### Radio button group, horizontal option (limit 3 min breakpoint-narrow)

```html
<auro-inputoption-radio-group for="radio4" label="Form label goes here" horizontal>
  <auro-inputoption id="radio4" label="Yes" name="radioDemo2" type="radio" value="yes"></auro-inputoption>
  <auro-inputoption id="radio5" label="No" name="radioDemo2" type="radio" value="no"></auro-inputoption>
  <auro-inputoption id="radio6" label="Maybe" name="radioDemo2" type="radio" value="maybe"></auro-inputoption>
</auro-inputoption-radio-group>
```

### Radio button group with option set to checked

```html
<auro-inputoption-radio-group for="radio13" label="Form label goes here">
  <auro-inputoption id="radio13" label="Yes" name="radioDemo4" type="radio" value="yes"></auro-inputoption>
  <auro-inputoption id="radio14" label="No" name="radioDemo4" type="radio" value="no" checked="true"></auro-inputoption>
  <auro-inputoption id="radio15" label="Maybe" name="radioDemo4" type="radio" value="maybe"></auro-inputoption>
</auro-inputoption-radio-group>
```

### Radio button group set disabled

```html
<auro-inputoption-radio-group for="radio16" label="Form label goes here" disabled>
  <auro-inputoption id="radio16" label="Yes" name="radioDemo5" type="radio" value="yes"></auro-inputoption>
  <auro-inputoption id="radio17" label="No" name="radioDemo5" type="radio" value="no" checked></auro-inputoption>
  <auro-inputoption id="radio18" label="Maybe" name="radioDemo5" type="radio" value="maybe"></auro-inputoption>
</auro-inputoption-radio-group>
```

### Radio button group with error

```html
<auro-inputoption-radio-group for="radio19" label="Form label goes here" error="Selection is required; please update.">
  <auro-inputoption id="radio19" label="Yes" name="radioDemo6" type="radio" value="yes"></auro-inputoption>
  <auro-inputoption id="radio20" label="No" name="radioDemo6" type="radio" value="no"></auro-inputoption>
  <auro-inputoption id="radio21" label="Maybe" name="radioDemo6" type="radio" value="maybe"></auro-inputoption>
</auro-inputoption-radio-group>
```

### Default checkbox group

```html
<auro-inputoption-checkbox-group for="computers" label="Form label goes here">
  <auro-inputoption id="computers" label="Computers" name="checkboxDemo1" type="checkbox" value="computers"></auro-inputoption>
  <auro-inputoption id="music" label="Music" name="checkboxDemo1" type="checkbox" value="music"></auro-inputoption>
  <auro-inputoption id="arts" label="Arts" name="checkboxDemo1" type="checkbox" value="arts"></auro-inputoption>
  <auro-inputoption id="sports" label="Sports" name="checkboxDemo1" type="checkbox" value="sports"></auro-inputoption>
  <auro-inputoption id="machines" label="Machines" name="checkboxDemo1" type="checkbox" value="machines"></auro-inputoption>
</auro-inputoption-checkbox-group>
```

### Checkbox group, horizontal option (limit 3 min breakpoint-narrow)

```html
<auro-inputoption-checkbox-group for="computers" label="Form label goes here" horizontal>
  <auro-inputoption id="computers" label="Computers" name="checkboxDemo2" type="checkbox" value="computers"></auro-inputoption>
  <auro-inputoption id="music" label="Music" name="checkboxDemo2" type="checkbox" value="music"></auro-inputoption>
  <auro-inputoption id="sports" label="Sports" name="checkboxDemo2" type="checkbox" value="sports"></auro-inputoption>
</auro-inputoption-checkbox-group>
```

### Checkbox group with option set to checked

```html
<auro-inputoption-checkbox-group for="computers" label="Form label goes here">
  <auro-inputoption id="computers" label="Computers" name="checkboxDemo4" type="checkbox" value="computers" checked></auro-inputoption>
  <auro-inputoption id="music" label="Music" name="checkboxDemo4" type="checkbox" value="music"></auro-inputoption>
  <auro-inputoption id="arts" label="Arts" name="checkboxDemo4" type="checkbox" value="arts"></auro-inputoption>
</auro-inputoption-checkbox-group>
```

### Checkbox group set disabled

```html
<auro-inputoption-checkbox-group for="checkboxDemo5" label="Form label goes here" disabled>
  <auro-inputoption id="computers" label="Computers" name="checkboxDemo5" type="checkbox" value="computers" checked></auro-inputoption>
  <auro-inputoption id="music" label="Music" name="checkboxDemo5" type="checkbox" value="music"></auro-inputoption>
  <auro-inputoption id="arts" label="Arts" name="checkboxDemo5" type="checkbox" value="arts"></auro-inputoption>
</auro-inputoption-checkbox-group>
```

### Checkbox group with error

```html
<auro-inputoption-checkbox-group for="computers" label="Form label goes here" error="Selection is required; please update.">
  <auro-inputoption id="computers" label="Computers" name="checkboxDemo6" type="checkbox" value="computers"></auro-inputoption>
  <auro-inputoption id="music" label="Music" name="checkboxDemo6" type="checkbox" value="music"></auro-inputoption>
  <auro-inputoption id="arts" label="Arts" name="checkboxDemo6" type="checkbox" value="arts"></auro-inputoption>
</auro-inputoption-checkbox-group>
```

## Development

In order to develop against this project, if you are not part of the core team, you will be required to fork the project prior to submitting a pull request.

Please be sure to review the [contribution guidelines](.github/CONTRIBUTING.md) for this project. Please make sure to **pay special attention** to the [conventional commits](.github/CONTRIBUTING.md#conventional-commits) section of the document.

### Start development environment

Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open three different shell sessions. One is for the Gulp tasks, the second is for a series of npm tasks and the last is to run the Polymer server.

```shell
// shell terminal one
$ gulp dev

// shell terminal two
$ npm run dev

// shell terminal three
$ npm run serve
```
