import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import FormSignup from '../components/FormSignup'

const SignUp = () => {
  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      h='calc(100vh - 18px)'
    >
      <Heading
        as='h2'
        textAlign='center'
        fontSize={['2xl', '4xl', '4xl']}
        fontWeight='bold'
        m={['6', '10', '10']}
      >
        Sign Up
      </Heading>
      <FormSignup />
    </Flex>
  )
}

export default SignUp
