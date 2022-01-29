import React from 'react'
import { Box, Image, Link } from '@chakra-ui/react'

import ToggleTheme from './ToggleTheme'

const Logo = () => {
  return (
    // width 100% -> do a navbar
    <>
      <Box pos='absolute' top='0' left='0' pl='4'>
        <Link href='/'>
          <Image src='/assets/logo.svg' alt='OpenMe logo' />
        </Link>
      </Box>
      <ToggleTheme />
    </>
  )
}

export default Logo
