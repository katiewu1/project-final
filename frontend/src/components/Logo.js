import React from 'react'
import { Box, Image, Link, useColorMode } from '@chakra-ui/react'

import ToggleTheme from './ToggleTheme'

const Logo = () => {
  const { colorMode } = useColorMode()

  return (
    // width 100% -> do a navbar
    <>
      <Box pos='absolute' top='0' left='0' pl='4'>
        <Link href='/'>
          <Image
            src='/assets/logo.svg'
            alt='OpenMe logo'
            filter={colorMode === 'light' ? 'invert(0)' : 'invert(100%)'}
          />
        </Link>
      </Box>
      <ToggleTheme />
    </>
  )
}

export default Logo
