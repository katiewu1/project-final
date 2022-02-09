import React from 'react'
import { Box, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box>
      <Text fontSize='12px' textAlign='center'>
        © 2022 by{' '}
        <Link
          href='https://www.linkedin.com/in/katie-wu-213a82150/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Katie Wu
        </Link>{' '}
        | Technigo Bootcamp Fall 2021
      </Text>
    </Box>
  )
}

export default Footer
