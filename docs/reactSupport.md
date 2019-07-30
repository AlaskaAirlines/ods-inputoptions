<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-inputoptions.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-inputoptions)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-inputoptions.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-inputoptions.svg?color=blue)

# React example using ods-inputoptions 

When using ODS Web Components and React as your front-end framework, there are some special considerations that may need to be accounted for. 

When using \<ods-inputoptions> the data collected from the checked events are bubbled up to the Web Component level, so there is no need to traverse the DOM looking for checked values. 

To start, let's import our dependencies into a new React component:

```js
import React, { Component } from "react";
import "@alaskaairux/ods-button/dist/ods-button";
import "@alaskaairux/ods-inputoptions/dist/ods-inputoptions";
```

Next, within the React component class, in the `constructor()` I am going to use the `React.createRef()` feature to create a reference to pass the value from the \<ods-inputoptions> component to the \<ods-button> component. 

```js
  constructor(props) {
    super(props);
    this.showCbx = React.createRef();
  }
```

Next in the `componentDidMount()` lifecycle method I apply the `current` value from the reference and apply that to the variable `showCbxEvent`. This is then bound to \<ods-button>'s `buttonCallback` API. 

`function showCbx()` is created to find \<ods-inputoptions> with the id of `cbx` and when the user clicks the button, an alert will open with the value of the selected option(s). 

```js
  componentDidMount() {
    const showCbxEvent = this.showCbx.current;

    function showCbx() {
      const cbxs = document.getElementById('cbx');
      alert(`You selected "${cbxs.value}"`);
    }

    showCbxEvent.buttonCallback = (e) => showCbx();
  }
```

Rendering the component requires no special support. Simply follow the components API to provide the experience you require.  

```js
  render() {
    return (
      <div>
        <fieldset>
          <ods-inputoptions id="cbx" type="checkbox" name="cbx" label="Form label goes here" for="cbx1" componentData='[
            { "id": "cbx1", "value": "yes", "label": "Yes", "checked": true },
            { "id": "cbx2", "value": "no", "label": "No", "checked": true },
            { "id": "cbx3", "value": "maybe", "label": "Maybe" }
          ]'></ods-inputoptions>
        </fieldset>

        <p>
          <ods-button outercontext title='show input' ref={this.showCbx}>Submit</ods-button>
        </p>
      </div>
    );
  }
```

##

Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
