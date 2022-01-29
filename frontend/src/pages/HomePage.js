import React from 'react'
import { Box, Heading, Text, Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Link as ReachLink } from '@reach/router'

import { CgProfile } from 'react-icons/cg'
import { MdLogin } from 'react-icons/md'

const HomePage = () => {
  return (
    <Box
      as='section'
      d='flex'
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <Box
        d='flex'
        justifyContent='space-evenly'
        alignItems='center'
        h='70%'
        w='100%'
        bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
      >
        <Box fontWeight='bold'>
          <Heading as='h1' fontSize='4xl'>
            OpenMe
          </Heading>
          <Text mt='3' fontSize='md'>
            Customize your own surprise OpenMe to someone...
          </Text>
          <Text mt='1' fontSize='md'>
            Write a Poem, send a Meme, pick a date to send an OpenMe!
          </Text>
        </Box>

        <ButtonGroup variant='outline' spacing='4'>
          <Link as={ReachLink} to='/signup'>
            <Button
              colorScheme='messenger'
              variant='outline'
              border='2px'
              size='md'
              rightIcon={<CgProfile />}
            >
              Sign Up
            </Button>
          </Link>
          <Link as={ReachLink} to='/login'>
            <Button
              colorScheme='teal'
              variant='outline'
              border='2px'
              size='md'
              rightIcon={<MdLogin />}
            >
              Log In
            </Button>
          </Link>
          <Link as={ReachLink} to='/user'>
            <Button
              colorScheme='orange'
              variant='outline'
              border='2px'
              size='md'
              rightIcon={<MdLogin />}
            >
              Logged in
            </Button>
          </Link>
        </ButtonGroup>
      </Box>
      {/* <Link as={ReachLink} to='/user/:id'>
        /user/:id
      </Link> */}
    </Box>
  )
}

export default HomePage
