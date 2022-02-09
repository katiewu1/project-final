import React from 'react'
import { useClipboard, Button } from '@chakra-ui/react'

import { API_URL_OPENME } from '../utils/urls'

const CopyLinkBtn = ({ collectionId }) => {
  const link = API_URL_OPENME(collectionId)
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <Button
      size='sm'
      fontSize={['12px', '14px', '14px']}
      w='58px'
      border='1px'
      borderColor='white'
      onClick={onCopy}
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}

export default CopyLinkBtn
