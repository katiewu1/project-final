import React from 'react'
import { Box, Image } from '@chakra-ui/react'

import ToggleTheme from './ToggleTheme'

const Logo = () => {
  return (
    // width 100% -> do a navbar
    <>
      <Box pos='absolute' top='0' left='0' zIndex='-1' pl='4'>
        <Image src='/assets/logo.svg' alt='OpenMe logo' />
      </Box>
      <ToggleTheme />
    </>
  )
}

export default Logo
