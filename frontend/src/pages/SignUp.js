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
      {/* <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem' }}>
        Sign Up
      </h2> */}
      <Form />
    </Flex>
  )
}

export default SignUp
