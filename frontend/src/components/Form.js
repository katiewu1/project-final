import React, { useState } from 'react'
import {
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

const Form = ({ mode }) => {
  // email error message
  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)
  // const isError = input === ''

  // password show password
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {mode === 'login' ? (
        <>
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
              value={input}
              onChange={handleInputChange}
              variant='outline'
              placeholder='email@example.com'
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
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
          >
            Log in
          </Button>
        </>
      ) : (
        <>
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
            />
            <FormLabel htmlFor='lastname'>Last name</FormLabel>
            <Input
              id='lastname'
              w='16rem'
              pr='4.5rem'
              variant='outline'
              placeholder='Last name'
            />
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              type='email'
              w='16rem'
              value={input}
              onChange={handleInputChange}
              variant='filled'
              placeholder='email@example.com'
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
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormLabel htmlFor='VerifyPassword'>Verify password</FormLabel>
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
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            // isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </>
      )}
    </form>
  )
}

export default Form
