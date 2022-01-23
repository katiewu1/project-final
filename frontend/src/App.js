import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './styles/theme'
import Logo from './components/Logo'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import UserProfile from './pages/UserProfile'
import MessageDetails from './pages/MessageDetails'

import user from './reducers/user'

const reducer = combineReducers({
  user: user.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Logo />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/users' element={<UserProfile />} />
            <Route path='/users/:id' element={<MessageDetails />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  )
}
