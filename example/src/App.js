import React from 'react'
import { useMyHook } from '@jasperdunn/react-form-hooks'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App