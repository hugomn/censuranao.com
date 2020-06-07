import React, { useEffect } from 'react'
import { initGA, logPageView } from "lib/ga" 

const BaseTemplate: React.FC = ({ children }) => {
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA();
      (window as any).GA_INITIALIZED = true;
    }
    logPageView() 
  }, [])
  
  return (
    <main data-testid="main">
      {children}
    </main>
  )
}

export default BaseTemplate
