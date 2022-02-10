import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import FormLogin from '../components/FormLogin'

const LogIn = () => {
  return (
    <Flex
      direction='column'
      align='center'
      h='calc(100vh - 18px)'
      overflow='auto'
      py='40px'
    >
      <Heading
        as='h2'
        textAlign='center'
        fontSize={['2xl', '4xl', '4xl']}
        fontWeight='bold'
        m={['6', '10', '10']}
      >
        Log In
      </Heading>
      <FormLogin />
    </Flex>
  )
}

export default LogIn
