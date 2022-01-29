import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/react'

import { API_URL_OPEN } from '../utils/urls'

const ViewCollection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    fetch(API_URL_OPEN(id))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCollection(data.response)
        } else {
          console.log('data.success = false')
        }
      })
      .catch((err) => console.log('error: ', err))
  }, [id])

  return (
    // TODO: user can pick different bgGradient colors, font style?
    <Box as='section'>
      <Box visibility={isVisible ? 'visible' : 'hidden'}>
        <Image
          src='/assets/env1.jpg'
          w='100vw'
          h='100vh'
          objectFit='cover'
          position='absolute'
          alt='envelope'
        />
        {/* TODO: Click on the logo and "open" the envelope */}
        <Box
          className='shake-slow shake-constant shake-constant--hover'
          position='absolute'
          left='50%'
          top='50%'
        >
          <Box as='button' onClick={() => setIsVisible(false)}>
            <Image src='/assets/logo.svg' alt='OpenMe logo' />
          </Box>
        </Box>
      </Box>
      {collection && (
        <Flex
          visibility={!isVisible ? 'visible' : 'hidden'}
          direction='column'
          justify='center'
          align='center'
          w='100vw'
          h='100vh'
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
        >
          {/* <Box bgGradient={['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)','linear(to-b, orange.100, purple.300)',]}> */}
          <Heading as='h2'>{collection.title}</Heading>
          <Text>{collection.date}</Text>
          <Image src={collection.image} maxWidth='300px' alt='image' />
          <Text fontStyle='italic'>{collection.message}</Text>
        </Flex>
      )}
    </Box>
  )
}

export default ViewCollection
