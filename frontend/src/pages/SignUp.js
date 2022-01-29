import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import Form from '../components/Form'

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
      <Form />
    </Flex>
  )
}

export default SignUp
