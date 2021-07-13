import React from 'react'

export function Island({
  children,
  componentName,
  islandTag: IslandComponent = 'div',
  ...islandProps
}) {
  const hydrationProps = JSON.stringify(React.Children.only(children).props)
  return (
    <IslandComponent
      data-tropical-hydration-component={componentName}
      data-tropical-hydration-props={hydrationProps}
      {...islandProps}
    >
      {children}
    </IslandComponent>
  )
}
