import React from 'react'
import { Box, Image } from '@chakra-ui/react'

const Logo = () => {
  return (
    <Box pos='absolute' top='0' left='0' zIndex='-1' pl='4'>
      <Image src='./assets/logo.svg' alt='OpenMe logo' />
    </Box>
  )
}

export default Logo
