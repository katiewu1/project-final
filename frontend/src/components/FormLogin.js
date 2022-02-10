import React, { useState, useEffect } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link,
  chakra,
} from '@chakra-ui/react'

import { API_URL } from '../utils/urls'
import user from '../reducers/user'

const FormLogin = () => {
  const errorMessage = useSelector((store) => store.user.error)
  const accessToken = useSelector((store) => store.user.accessToken)

  // Password show/hide
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // If the user is logged in -> go to the user profile
  useEffect(() => {
    if (accessToken) {
      navigate('/user')
    }
  }, [accessToken, navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

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
        } else {
          batch(() => {
            //  wipe out the prev. saved information, and save only the errors
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.message))
          })
        }
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        dispatch(user.actions.setError(err.message))
        navigate('*')
      })
  }
  return (
    <Box
      as='section'
      boxShadow='dark-lg'
      p='42px'
      borderRadius='8px'
      bgGradient={[
        'linear(to-tr, teal.300, yellow.400)',
        'linear(to-t, blue.200, teal.500)',
        'linear(to-b, orange.100, purple.300)',
      ]}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleLogin}
      >
        <FormControl isRequired isInvalid={errorMessage} color='black'>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            id='email'
            type='email'
            mb='2'
            variant='outline'
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired isInvalid={errorMessage} color='black'>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup size='md'>
            <Input
              id='password'
              type={show ? 'text' : 'password'}
              variant='outline'
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
        </FormControl>

        <Text fontSize='12px' fontStyle='italic' color='black' mt='1'>
          Fields marked <chakra.span color='red'>*</chakra.span> are required
        </Text>

        {errorMessage && (
          <Text fontSize='12px' fontStyle='italic' color='red'>
            *{errorMessage}
          </Text>
        )}
        <Button
          mt={4}
          w='100%'
          colorScheme='teal'
          type='submit'
          isLoading={isLoading}
        >
          Log in
        </Button>
      </form>
      <Text textAlign='center' mt='4' color='black'>
        Need an account?{' '}
        <Link href='/signup' fontWeight='bold' color='teal'>
          SIGN UP
        </Link>
      </Text>
    </Box>
  )
}

export default FormLogin
