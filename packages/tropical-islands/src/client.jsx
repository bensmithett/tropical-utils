import React from 'react'
import ReactDOM from 'react-dom'

export function hydrateIslands(islands, Providers = ({ children }) => children) {
  document.querySelectorAll('[data-tropical-hydration-component]').forEach((island) => {
    const Component = islands[island.dataset.tropicalHydrationComponent]

    if (!Component) {
      console.warn(
        `Found a server-rendered Tropical Island for ${island.dataset.tropicalHydrationComponent} but that component was not passed to hydrateIslands`
      )
      return
    }

    const hydrationProps = JSON.parse(island.dataset.tropicalHydrationProps)
    ReactDOM.hydrate(
      <Providers>
        <Component {...hydrationProps} />
      </Providers>,
      island
    )
  })
}
