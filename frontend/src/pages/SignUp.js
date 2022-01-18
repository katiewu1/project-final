import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

import Form from '../components/Form'

const SignUp = () => {
  return (
    <Box as='section'>
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
    </Box>
  )
}

export default SignUp
