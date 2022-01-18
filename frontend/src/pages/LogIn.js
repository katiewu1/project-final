import React from 'react'
import { Box, Heading } from '@chakra-ui/react'

import Form from '../components/Form'

const LogIn = () => {
  return (
    <Box as='section'>
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
    </Box>
  )
}

export default LogIn
