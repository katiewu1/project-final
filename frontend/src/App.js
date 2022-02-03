import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from '@reduxjs/toolkit'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './styles/theme'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserProfile from './pages/UserProfile'
import Collection from './pages/Collection'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

// const store = configureStore({ reducer })

// get the localStorage in JSON string format
const persistedStateJSON = localStorage.getItem('userReduxState')
let persistedState = {}

// if we have data in persistedStateJSON -> convert to an object
if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
}

// create a store with initial state
const store = createStore(
  reducer,
  { user: persistedState },
  /* enable the redux devtools */
  /* eslint-disable-next-line no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// store the state (only accessToken and userId) in localStorage as JSON string on Redux state change
store.subscribe(() => {
  console.log(store.getState())
  localStorage.setItem(
    'userReduxState',
    JSON.stringify({
      accessToken: store.getState().user.accessToken,
      userId: store.getState().user.userId,
    })
  )
})

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Logo />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/user' element={<UserProfile />} />
            <Route path='/open/:id' element={<Collection />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}
