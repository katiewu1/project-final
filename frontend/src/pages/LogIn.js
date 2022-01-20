import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import Form from '../components/Form'

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
      {/* <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem' }}>
        Log In
      </h2> */}
      <Form mode={'login'} />
    </Flex>
  )
}

export default LogIn
