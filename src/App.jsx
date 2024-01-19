import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MySalesPage from './pages/MySalesPage'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route Component={MySalesPage} path='/' />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
