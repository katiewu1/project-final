import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  // Flex,
} from '@chakra-ui/react'

import { API_URL } from '../utils/urls'
import user from '../reducers/user'

const Form = ({ mode }) => {
  // // email error message
  // const [input, setInput] = useState('')
  // const handleInputChange = (e) => setInput(e.target.value)
  // // const isError = input === ''

  // password show password
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  // useState sign up
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   // if we have accesstoken navigate to the Main
  //   if (accessToken) {
  //     navigate('/')
  //   }
  // }, [accessToken, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    }

    fetch(API_URL('signup'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setFirstname(data.response.firstname))
            dispatch(user.actions.setLastname(data.response.lastname))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            // wipe out the prev. errors
            dispatch(user.actions.setError(null))
          })
          // move this to an useEffect when I implement accessToken
          navigate('/users')
        } else {
          batch(() => {
            //  wipe out the prev. saved information, and save only the errors
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setFirstname(null))
            dispatch(user.actions.setLastname(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
      .catch((err) => console.log('error: ', err))
  }

  const handleLogin = () => {
    // e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }

    fetch(API_URL('login'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            // wipe out the prev. errors
            dispatch(user.actions.setError(null))
          })
          // move this to an useEffect when I implement accessToken
          navigate('/users')
        } else {
          batch(() => {
            //  wipe out the prev. saved information, and save only the errors
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response))
          })
        }
      })
      .catch((err) => console.log('error: ', err))
  }

  return (
    <Box as='section'>
      {mode === 'login' ? (
        <>
          {/* <form onSubmit={onLogin}> */}
          <FormControl
            // isInvalid={!isError}
            isRequired
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              id='username'
              w='16rem'
              mb='2'
              pr='4.5rem'
              variant='outline'
              placeholder='Username'
            />
            Username or email?
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              type='email'
              w='16rem'
              mb='2'
              variant='outline'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* password input */}
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup size='md' width='16rem'>
              <Input
                id='password'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                variant='filled'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              mt={4}
              colorScheme='teal'
              // isLoading={props.isSubmitting}
              type='button'
              onClick={handleLogin}
            >
              Log in
            </Button>
          </FormControl>
          {/* </form> */}
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <FormControl
              // isInvalid={!isError}
              isRequired
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormLabel htmlFor='firstname'>First name</FormLabel>
              <Input
                id='firstname'
                w='16rem'
                mb='2'
                variant='filled'
                placeholder='First name'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <FormLabel htmlFor='lastname'>Last name</FormLabel>
              <Input
                id='lastname'
                w='16rem'
                pr='4.5rem'
                variant='outline'
                placeholder='Last name'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                w='16rem'
                variant='filled'
                placeholder='email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* {!isError ? (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )} */}
              <FormLabel htmlFor='username'>Username remove?</FormLabel>
              <Input
                id='username'
                w='16rem'
                mb='2'
                pr='4.5rem'
                variant='outline'
                placeholder='Username'
              />
              {/* password input */}
              <FormLabel htmlFor='password'>Password</FormLabel>
              <InputGroup size='md' width='16rem'>
                <Input
                  id='password'
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  variant='filled'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormLabel htmlFor='verifyPassword'>Verify password</FormLabel>
              <InputGroup size='md' width='16rem'>
                <Input
                  id='verifyPassword'
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  variant='filled'
                  placeholder='Verify password'
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                mt={4}
                colorScheme='teal'
                // isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </>
      )}
    </Box>
  )
}

export default Form
