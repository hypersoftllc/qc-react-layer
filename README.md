# @qc/react-layer

[![Build Status][travis-svg]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

A React component that renders a `div` with the semantics of representing a
layer.  Layers are [Blocks][qc-react-block] that are designed to be stacked.
Each layer starts a new [stacking context][mdn-stacking-context].


## Installation

```sh
npm install --save @qc/react-layer
```

or

```sh
yarn add @qc/react-layer
```


## Example Usage

The following example shows how a page can be composed of multiple layers.

```jsx
// HomePage.jsx
import React from 'react'

import Layer from '@qc/react-layer'
import Page from '@qc/react-page'

import '@qc/react-block/dist/styles/Block.css'
import '@qc/react-layer/dist/styles/Layer.css'
import '@qc/react-page/umd/react-page.css'
import './HomePage.css'


export default class HomePage extends React.Component {
  render() {
    const { dialogs, drawers, messages } = this.props;
    return (
      <Page className="HomePage">
        <Layer className="MainLayer">
          <Page.Head>...</Page.Head>
          <Page.Body>
            <h2>Home Page</h2>
            ...
          </Page.Body>
        </Layer>
        <Layer className="DrawersLayer">
          {drawers}
        </Layer>
        <Layer className="DialogLayer">
          {dialogs}
        </Layer>
        <Layer className="MessageLayer">
          {messages}
        </Layer>
      </Page>
    )
  }
}
```

```css
/* HomePage.css */
.DrawersLayer {
  z-index: 1;
}
.DialogLayer {
  z-index: 2;
}
.MessageLayer {
  z-index: 3;
}
```

**Just Using `Layer` CSS**

The key to the `Layer` component is in the CSS — not the JavaScript.  So, we
need to include the `Layer` CSS.  Also, because `Layer` is a `Block` component,
we need to include its CSS too.

```jsx
import React from 'react'

import '@qc/react-block/dist/styles/Block.css'
import '@qc/react-layer/dist/styles/Layer.css'


export default function MessageLayer(props) {
  return (
    <div className="Block Layer">
      ...
    </div>
  )
}
```


## Usage with `@qc/react-page`

An application can be thought of as a set of pages, sometimes known as screens.
Within each page may exist several layers.  Layers may be explicit or implicit.
An example of an explicit layer is when a React component exists for the purpose
of representing a layer.  That is the purpose of this library.  If the layer is
not explicit, then it is implicit.  The main downfall of implicit layers is that
it is not clear where it begins and where it ends.

There always exists at least one layer, the main layer.  This layer
represents/contains the main content of the page.  There may be times when a
need arises where a page has multiple layers.  A classic example is when a modal
dialog is displayed.  Where the dialog is displayed is in a layer, whether
implicit or explicit, above the main layer.  In the same page, another layer
may exist where notification messages are shown.  This layer is usually above
the dialog layer so that messages will be seen while a dialog is shown.

```jsx
import React from 'react'
import Layer from '@qc/react-layer'
import Page from '@qc/react-page'


class HomePage extends React.Component {
  render() {
    const { showLightbox, showLoginModal } = this.state;
    return (
      <Page className="HomePage">
        <Layer className="MainLayer">
          <Page.Head>
            {/* Insert head components here. */}
          </Page.Head>
          <Page.Body>
            {/* Insert main components here. */}
          </Page.Body>
          <Page.Foot>
            {/* Insert foot components here. */}
          </Page.Foot>
        </Layer>
        {
          (showLightbox || showLoginModal) &&
          <Layer className="DialogLayer">
            {/* Insert modals here. */}
            { showLightbox && <Lightbox/> }
            { showLoginModal && <LoginModal/> }
          </Layer>
        }
        <Layer className="NotificationLayer">
          {/* Insert notification components here. */}
        </Layer>
      </Page>
    )
  }
}
```


## Stacking Context & `z-index`

An HTML document has one or more [stacking context][mdn-stacking-context].
Within an given stacking context, all `z-index` values are treated relative to
each other.  That is, `z-index` in one stacking context has no effect on the
`z-index` in a different stacking context.

To reiterate, a document with one stacking context treats all `z-index` values
relative to each other.  A document with more than one stacking contexts treat
all `z-index` values within the _same_ stacking context relative to each other.

This means that an element with a `z-index` of `10000` in one stacking context
won't necessarily be stacked higher than an element with a `z-index` of `1` in
another stacking context.


## Use ES Modules

This package also comes with the source and an ES variation.  Instead of

```jsx
import Layer from '@qc/react-layer'
```

use

```jsx
import Layer from '@qc/react-layer/es/Layer'
```

or

```jsx
import Layer from '@qc/react-layer/src/Layer'
```

to import the component.

If you do this, then you will need to be sure to transpile the code to a syntax
compatible with the browsers you plan to support.

The source is using object spread syntax.  In order to transpile it with
[babel], you must include the [object spread transform
plugin][babel-obj-sprd-txm].


## Other Packages from [QC]

* [@qc/react-block][qc-react-block]
* [@qc/react-conditionals][qc-react-conditionals]
* [@qc/react-page][qc-react-page]


## Maintainers

- [Danny Hurlburt](https://github.com/dhurlburtusa)


## License

ISC


[babel]: https://babeljs.io/
[babel-obj-sprd-txm]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
[coverage-image]: https://coveralls.io/repos/github/hypersoftllc/qc-react-layer/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/hypersoftllc/qc-react-layer?branch=master
[downloads-image]: http://img.shields.io/npm/dm/@qc/react-layer.svg
[downloads-url]: http://npm-stat.com/charts.html?package=@qc/react-layer
[license-image]: http://img.shields.io/npm/l/@qc/react-layer.svg
[license-url]: LICENSE
[package-url]: https://npmjs.org/package/@qc/react-layer
[mdn-stacking-context]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
[npm-badge-png]: https://nodei.co/npm/@qc/react-layer.png?downloads=true&stars=true
[qc]: https://www.npmjs.com/~qc
[qc-react-block]: https://www.npmjs.com/package/@qc/react-block
[qc-react-conditionals]: https://www.npmjs.com/package/@qc/react-conditionals
[qc-react-page]: https://www.npmjs.com/package/@qc/react-page
[travis-svg]: https://travis-ci.org/hypersoftllc/qc-react-layer.svg?branch=master
[travis-url]: https://travis-ci.org/hypersoftllc/qc-react-layer
