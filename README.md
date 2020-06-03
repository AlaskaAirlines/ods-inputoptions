# inputoption

`<ods-inputoption>` is a wrapper component for a HTML `<input type"checkbox">` or `<input type"radio">` elements containing styling and behavior.

## Install

[![Build Status](https://img.shields.io/travis/AlaskaAirlines/ods-inputoptions.svg?branch=master&style=for-the-badge)](https://travis-ci.org/github/AlaskaAirlines/ods-inputoptions)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/ods-inputoptions.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/ods-inputoptions)
[![License](https://img.shields.io/npm/l/@alaskaairux/ods-inputoptions.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/ods-inputoptions.svg?style=for-the-badge)](https://github.com/AlaskaAirlines/ods-inputoptions/issues)

```shell
$ npm i @alaskaairux/ods-inputoptions
```

### Design Token CSS Custom Property dependency

The use of any ODS Component has a dependency on the [ODS Design Tokens (npm install)](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens). See repository and API information [here](https://github.com/AlaskaAirlines/OrionDesignTokens#orion-design-tokens).

For additional details in regards to using Orion Design Tokens with components, please see [./docs/TECH_DETAILS.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md#building-resources-from-orion-design-tokens)

### CSS Custom Property fallbacks

CSS Custom Properties are not supported in older browsers. For this, fallback properties are pre-generated and included with the npm. Any update to the Orion Design Tokens will be immediately reflected with browsers that support CSS Custom Properties, legacy browsers will require updated components with pre-generated fallback properties.

### Define dependency in project component

Define the component dependency within each component that is using the `<ods-inputoptions>` component.

```javascript
import "@alaskaairux/ods-inputoptions";
```

**Reference component in HTML**

```html
<ods-inputoption></ods-inputoption>
```

See additional examples below.

## Element ods-inputoption

### inputoption use cases

The `<ods-inputoptions>` element should be used in situations where users may:

* Want an element that can be turned on and off.
* Have a collections of radio buttons describing a set of related options
* Require users to check an options

### inputoption groups 

Using `<ods-inputoptions>` required a group wrapper. Depending on wether the intention is to use radio buttons or checkboxes, depends on the group used. 

For radio buttons, use:

```html
<ods-inputoption-radio-group for="radioDemo1" label="Form label goes here">
  <ods-inputoption inputid="radio1" label="Yes" type="radio"></ods-inputoption>
  <ods-inputoption inputid="radio2" label="No" type="radio"></ods-inputoption>
</ods-inputoption-radio-group>
``` 

For checkboxes, use:

```html
<ods-inputoption-checkbox-group for="checkboxDemo1" label="Form label goes here" horizontal>
  <ods-inputoption inputid="computers" label="Computers" name="checkboxDemo2" type="checkbox" value="computers"></ods-inputoption>
  <ods-inputoption inputid="music" label="Music" name="checkboxDemo2" type="checkbox" value="music"></ods-inputoption>![]()
</ods-inputoption-checkbox-group>
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

The following examples illustrate the use of `ods-inputoption` within the scope of either `ods-inputoption-checkbox-group` or `ods-inputoption-radio-group`.

### Default radio button group

```html
<ods-inputoption-radio-group for="radio1" label="Form label goes here">
  <ods-inputoption id="radio1" label="Yes" name="radioDemo1" type="radio" value="yes"></ods-inputoption>
  <ods-inputoption id="radio2" label="No" name="radioDemo1" type="radio" value="no"></ods-inputoption>
  <ods-inputoption id="radio3" label="Maybe" name="radioDemo1" type="radio" value="maybe"></ods-inputoption>
</ods-inputoption-radio-group>
```

### Radio button group, horizontal option (limit 3 min breakpoint-narrow)

```html
<ods-inputoption-radio-group for="radio4" label="Form label goes here" horizontal>
  <ods-inputoption id="radio4" label="Yes" name="radioDemo2" type="radio" value="yes"></ods-inputoption>
  <ods-inputoption id="radio5" label="No" name="radioDemo2" type="radio" value="no"></ods-inputoption>
  <ods-inputoption id="radio6" label="Maybe" name="radioDemo2" type="radio" value="maybe"></ods-inputoption>
</ods-inputoption-radio-group>
```

### Radio button group with option set to checked

```html
<ods-inputoption-radio-group for="radio13" label="Form label goes here">
  <ods-inputoption id="radio13" label="Yes" name="radioDemo4" type="radio" value="yes"></ods-inputoption>
  <ods-inputoption id="radio14" label="No" name="radioDemo4" type="radio" value="no" checked="true"></ods-inputoption>
  <ods-inputoption id="radio15" label="Maybe" name="radioDemo4" type="radio" value="maybe"></ods-inputoption>
</ods-inputoption-radio-group>
```

### Radio button group set disabled

```html
<ods-inputoption-radio-group for="radio16" label="Form label goes here" disabled>
  <ods-inputoption id="radio16" label="Yes" name="radioDemo5" type="radio" value="yes"></ods-inputoption>
  <ods-inputoption id="radio17" label="No" name="radioDemo5" type="radio" value="no" checked></ods-inputoption>
  <ods-inputoption id="radio18" label="Maybe" name="radioDemo5" type="radio" value="maybe"></ods-inputoption>
</ods-inputoption-radio-group>
```

### Radio button group with error

```html
<ods-inputoption-radio-group for="radio19" label="Form label goes here" error="Selection is required; please update.">
  <ods-inputoption id="radio19" label="Yes" name="radioDemo6" type="radio" value="yes"></ods-inputoption>
  <ods-inputoption id="radio20" label="No" name="radioDemo6" type="radio" value="no"></ods-inputoption>
  <ods-inputoption id="radio21" label="Maybe" name="radioDemo6" type="radio" value="maybe"></ods-inputoption>
</ods-inputoption-radio-group>
```

### Default checkbox group

```html
<ods-inputoption-checkbox-group for="computers" label="Form label goes here">
  <ods-inputoption id="computers" label="Computers" name="checkboxDemo1" type="checkbox" value="computers"></ods-inputoption>
  <ods-inputoption id="music" label="Music" name="checkboxDemo1" type="checkbox" value="music"></ods-inputoption>
  <ods-inputoption id="arts" label="Arts" name="checkboxDemo1" type="checkbox" value="arts"></ods-inputoption>
  <ods-inputoption id="sports" label="Sports" name="checkboxDemo1" type="checkbox" value="sports"></ods-inputoption>
  <ods-inputoption id="machines" label="Machines" name="checkboxDemo1" type="checkbox" value="machines"></ods-inputoption>
</ods-inputoption-checkbox-group>
```

### Checkbox group, horizontal option (limit 3 min breakpoint-narrow)

```html
<ods-inputoption-checkbox-group for="computers" label="Form label goes here" horizontal>
  <ods-inputoption id="computers" label="Computers" name="checkboxDemo2" type="checkbox" value="computers"></ods-inputoption>
  <ods-inputoption id="music" label="Music" name="checkboxDemo2" type="checkbox" value="music"></ods-inputoption>
  <ods-inputoption id="sports" label="Sports" name="checkboxDemo2" type="checkbox" value="sports"></ods-inputoption>
</ods-inputoption-checkbox-group>
```

### Checkbox group with option set to checked

```html
<ods-inputoption-checkbox-group for="computers" label="Form label goes here">
  <ods-inputoption id="computers" label="Computers" name="checkboxDemo4" type="checkbox" value="computers" checked></ods-inputoption>
  <ods-inputoption id="music" label="Music" name="checkboxDemo4" type="checkbox" value="music"></ods-inputoption>
  <ods-inputoption id="arts" label="Arts" name="checkboxDemo4" type="checkbox" value="arts"></ods-inputoption>
</ods-inputoption-checkbox-group>
```

### Checkbox group set disabled

```html
<ods-inputoption-checkbox-group for="checkboxDemo5" label="Form label goes here" disabled>
  <ods-inputoption id="computers" label="Computers" name="checkboxDemo5" type="checkbox" value="computers" checked></ods-inputoption>
  <ods-inputoption id="music" label="Music" name="checkboxDemo5" type="checkbox" value="music"></ods-inputoption>
  <ods-inputoption id="arts" label="Arts" name="checkboxDemo5" type="checkbox" value="arts"></ods-inputoption>
</ods-inputoption-checkbox-group>
```

### Checkbox group with error

```html
<ods-inputoption-checkbox-group for="computers" label="Form label goes here" error="Selection is required; please update.">
  <ods-inputoption id="computers" label="Computers" name="checkboxDemo6" type="checkbox" value="computers"></ods-inputoption>
  <ods-inputoption id="music" label="Music" name="checkboxDemo6" type="checkbox" value="music"></ods-inputoption>
  <ods-inputoption id="arts" label="Arts" name="checkboxDemo6" type="checkbox" value="arts"></ods-inputoption>
</ods-inputoption-checkbox-group>
```

## Development

Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open three different shell sessions. One is for the Gulp tasks, the second is for a series of npm tasks and the last is to run the Polymer server.

```shell
// shell terminal one
$ gulp dev

// shell terminal two
$ npm run dev

// shell terminal three
$ npm run serve
```
