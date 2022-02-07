import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import FormSignupLogin from '../components/FormSignupLogin'

const LogIn = () => {
  return (
    <Flex direction='column' justify='center' align='center' h='100vh'>
      <Heading
        as='h2'
        textAlign='center'
        fontSize={['2xl', '4xl', '4xl']}
        fontWeight='bold'
        m={['6', '10', '10']}
      >
        Log In
      </Heading>
      <FormSignupLogin mode={'login'} />
    </Flex>
  )
}

export default LogIn
