import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Image, Link, useColorMode } from '@chakra-ui/react'

import ToggleTheme from './ToggleTheme'

const Logo = () => {
  const { colorMode } = useColorMode()
  const location = useLocation() // Find which path you are on
  // If it's the Collection page -> don't add a filter on the logo image
  const isCollectionPage = location.pathname.startsWith('/open')

  return (
    <>
      <Link href='/'>
        <Box pos='absolute' top='0' left='0' pl='4'>
          <Image
            src='/assets/logo.svg'
            w={['84px', '84px', '134px']}
            alt='OpenMe logo'
            filter={
              colorMode === 'light' || isCollectionPage
                ? 'invert(0)'
                : 'invert(80%)'
            }
          />
        </Box>
      </Link>
      <ToggleTheme />
    </>
  )
}

export default Logo
