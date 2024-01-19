import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MySalesPage from './pages/MySalesPage'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import PrintScreen from './screens/PrintScreen.jsx'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route Component={MySalesPage} path='/' />
          <Route Component={PrintScreen} path='/print' />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
