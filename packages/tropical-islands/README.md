# `tropical-islands`

Simple islands architecture helpers for React. Built for [Tropical](https://tropical.js.org/) but usable wherever you use React.

```bash
npm install tropical-islands
```

## Islands Architecture

[Islands Architecture](https://jasonformat.com/islands-architecture/) refers to the [old-fashioned](https://www.bensmithett.com/declarative-js-components-with-viewloader-js/) practice of selectively, progressively enhancing bits of server-rendered HTML with client-side JS.

The React community has taken a while to get here. Major frameworks defaulted to downloading and hydrating the entire page as a single root-level component, even if most components that make up the page needed no client-side enhancements.

Instead we can take a [partial hydration](https://markus.oberlehner.net/blog/partial-hydration-concepts-lazy-and-active/) approach, selectively hydrating the parts of the page that need it.

## Usage

### Server: `<Island>`

When composing server-rendered (SSR) pages, draw islands around pieces of the page that need to be hydrated with client-side JS.

```javascript
import { Island } from 'tropical-islands'
import { InteractiveComponent } from './InteractiveComponent'
import { StaticComponent } from './StaticComponent'

export function MyPage () {
  <div>
    <StaticComponent />
    <Island componentName='InteractiveComponent'>
      <InteractiveComponent some='props' />
    </Island>
    <StaticComponent />
  </div>
}
```

`<Island>` renders your component inside a div with some data attributes that will be used for client-side [hydration](https://reactjs.org/docs/react-dom.html#hydrate):

```html
<div>
  <!-- StaticComponent server-rendered here -->
  <div
    data-tropical-hydration-component='InteractiveComponent'
    data-tropical-hydration-props='{"some": "props"}'
  >
    <!-- InteractiveComponent server-rendered here -->
  </div>
  <!-- StaticComponent server-rendered here -->
</div>
```

#### Props

- `componentName` *(required)* the name of the component in the object passed to `hydrateIslands`
- `islandTag` *(optional, default: `'div'`)* the HTML wrapper tag
- `islandProps` *(optional, default: `{}`)* props to pass to `islandTag` for server-render

### Client: `hydrateIslands(components, Providers)`

From your client-side JS, call `hydrateIslands` with an object listing all the components you wish to hydrate.

```javascript
import { hydrateIslands } from 'tropical-islands'
import { InteractiveComponent } from './InteractiveComponent'
import { OtherInteractiveComponent } from './OtherInteractiveComponent'

hydrateIslands({
  InteractiveComponent,
  OtherInteractiveComponent
})
```

#### Arguments

- `components` *(required)* an object containing components, keyed by the `componentName` passed to a server-side `<Island>`
- `Providers` *(optional, default: `({ children }) => children`)* a component that doesn't render any HTML but can be used to wrap your own component with context [providers](https://reactjs.org/docs/context.html#contextprovider).
