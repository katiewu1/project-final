import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import FormSignupLogin from '../components/FormSignupLogin'

const SignUp = () => {
  return (
    <Flex direction='column' justify='center' align='center' h='100vh'>
      <Heading
        as='h2'
        textAlign='center'
        fontSize='3xl'
        fontWeight='semi'
        m='10'
      >
        Sign Up
      </Heading>
      <FormSignupLogin />
    </Flex>
  )
}

export default SignUp
