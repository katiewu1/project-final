import React, { useState, useEffect } from 'react'
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react'
import moment from 'moment'

const ViewCollection = ({ collection, isLive, error }) => {
  const [isVisible, setIsVisible] = useState(null)

  useEffect(() => {
    setIsVisible(isLive)
  }, [isLive])

  return (
    <Box as='section' color='black'>
      <Box visibility={isVisible ? 'visible' : 'hidden'}>
        <Image
          src='/assets/env1.jpg'
          maxW='100vw'
          h='100vh'
          objectFit='cover'
          position='absolute'
          alt='envelope'
        />
        {/* Click on the OpenMe logo and "open" the envelope */}
        <Box
          className='shake-slow shake-constant shake-constant--hover'
          position='absolute'
          left='35%'
          top='50%'
        >
          <Box as='button' onClick={() => setIsVisible(false)}>
            <Image src='/assets/logo.svg' alt='OpenMe logo' />
          </Box>
        </Box>
      </Box>
      <Flex
        visibility={!isVisible ? 'visible' : 'hidden'}
        direction='column'
        align='center'
        maxW='100vw'
        h={isLive ? 'calc(100vh - 18px)' : '500px'}
        pt={isLive ? '100px' : '50px'}
        pb='40px'
        bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
        overflow='auto'
      >
        {collection && (
          <>
            <Heading as='h2' textAlign='center'>
              {collection.title}
            </Heading>
            <Text>{moment.utc(collection.date).format('LL')}</Text>
            <Image src={collection.image} maxWidth='300px' alt='image' />
            <Text fontStyle='italic' whiteSpace='pre-wrap'>
              {collection.message}
            </Text>
          </>
        )}
        {error && (
          <Flex
            d='column'
            pt='200px'
            pb='100px'
            fontWeight='bold'
            textAlign='center'
          >
            <Text>{error}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default ViewCollection
