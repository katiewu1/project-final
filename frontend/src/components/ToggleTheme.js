import React from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, IconButton, Stack, Text, useColorMode } from '@chakra-ui/react'

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      d='flex'
      justifyContent='end'
      alignItems='center'
      p='1'
      pos='absolute'
      top='0'
      right='0'
    >
      <Stack isInline>
        <IconButton
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          variant='outline'
          colorScheme='teal'
          aria-label='Color mode switcher'
          onClick={toggleColorMode}
        >
          Switch Mode
        </IconButton>
      </Stack>
      <Text fontSize='14px' mx='2'>
        {colorMode === 'light' ? 'Light mode' : 'Dark mode'}
      </Text>
    </Box>
  )
}

export default ToggleTheme
