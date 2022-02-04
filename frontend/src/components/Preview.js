import React from 'react'
import { Box, Text } from '@chakra-ui/react'

import ViewCollection from './ViewCollection'

const Preview = ({ collection }) => {
  return (
    <Box>
      <Text mb='2' fontWeight='bold'>
        PREVIEW
      </Text>
      {/* TODO: reuseable component, the same as in Collection page */}
      <ViewCollection collection={collection} isLive={false} />
    </Box>
  )
}

export default Preview
