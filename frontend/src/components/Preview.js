import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import ViewCollection from './ViewCollection'

const Preview = ({ collection }) => {
  return (
    <Box w={['100%', '50%', '50%']} pl={['2', '', '']}>
      <Text mb='2' fontWeight='bold'>
        PREVIEW
      </Text>
      <ViewCollection collection={collection} isLive={false} />
    </Box>
  )
}

export default Preview
