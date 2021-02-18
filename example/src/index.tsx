import React from 'react'
import ReactDOM from 'react-dom'
import { HooksForm } from './HooksForm'

function App(): JSX.Element {
  return <HooksForm />
}

// eslint-disable-next-line no-undef
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
