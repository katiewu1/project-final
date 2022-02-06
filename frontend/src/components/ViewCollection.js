import React, { useState, useEffect } from 'react'
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react'
import moment from 'moment'

const ViewCollection = ({ collection, isLive, error }) => {
  const [isVisible, setIsVisible] = useState(null)

  useEffect(() => {
    setIsVisible(isLive)
  }, [isLive])

  console.log('isLive: ', isLive)
  // console.log('isVisible', isVisible)

  // To get the user's locale with javascript
  // const locale = window.navigator.userLanguage || window.navigator.language

  return (
    // TODO: user can pick different bgGradient colors, font style?
    <Box as='section'>
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
        justify='center'
        align='center'
        maxW='100vw'
        // if it's live 100vh, preview -> 500px
        h={isLive ? '100vh' : '500px'}
        bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
      >
        {/* <Box bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]}> */}
        {collection && (
          <>
            <Heading as='h2'>{collection.title}</Heading>
            <Text>{moment.utc(collection.date).format('LL')}</Text>
            <Image src={collection.image} maxWidth='300px' alt='image' />
            <Text fontStyle='italic' whiteSpace='pre-wrap'>
              {collection.message}
            </Text>
          </>
        )}
        {error && (
          <Flex>
            <Text>{error}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default ViewCollection