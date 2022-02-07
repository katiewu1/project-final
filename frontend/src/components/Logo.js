import React from 'react'
import { Box, Image, Link, useColorMode } from '@chakra-ui/react'

import ToggleTheme from './ToggleTheme'

const Logo = () => {
  const { colorMode } = useColorMode()

  return (
    // width 100% -> do a navbar
    <>
      <Link href='/'>
        <Box pos='absolute' top='0' left='0' pl='4'>
          <Image
            src='/assets/logo.svg'
            w={['84px', '84px', '134px']}
            alt='OpenMe logo'
            filter={colorMode === 'light' ? 'invert(0)' : 'invert(80%)'}
          />
        </Box>
      </Link>
      <ToggleTheme />
    </>
  )
}

export default Logo
