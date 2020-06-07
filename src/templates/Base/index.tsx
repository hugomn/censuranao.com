import React from 'react'

const BaseTemplate: React.FC = ({ children }) => {
  return (
    <main data-testid="main">
      {children}
    </main>
  )
}

export default BaseTemplate
