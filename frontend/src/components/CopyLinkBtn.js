import React from 'react'
import { useClipboard, Button, Tooltip } from '@chakra-ui/react'

import { API_URL_OPENME } from '../utils/urls'

const CopyLinkBtn = ({ collectionId }) => {
  const link = API_URL_OPENME(collectionId)
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <Tooltip
      hasArrow
      label='URL to view OpenMe message'
      aria-label='A tooltip'
      bg='purple.300'
    >
      <Button size='sm' border='1px' borderColor='white' onClick={onCopy}>
        {hasCopied ? 'Copied' : 'Copy'}
      </Button>
    </Tooltip>
  )
}

export default CopyLinkBtn
