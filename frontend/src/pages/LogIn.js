import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import FormSignupLogin from '../components/FormSignupLogin'

const LogIn = () => {
  return (
    <Flex direction='column' justify='center' align='center' h='100vh'>
      <Heading
        as='h2'
        textAlign='center'
        fontSize='3xl'
        fontWeight='semi'
        m='10'
      >
        Log In
      </Heading>
      <FormSignupLogin mode={'login'} />
    </Flex>
  )
}

export default LogIn
