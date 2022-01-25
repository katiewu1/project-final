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
      justifyContent='space-evenly'
      alignItems='center'
      h='100vh'
    >
      <Box>
        <Heading as='h1' fontSize='3xl' fontWeight='semi' color='teal'>
          Calendar Maker/OM - OpenMe?
        </Heading>
        <Text mt='1' fontSize='md'>
          Custom your own surprise calendar to someone...
        </Text>
      </Box>
      {/* <ButtonGroup variant='outline' spacing='4'>
        <Button colorScheme='messenger' size='md' rightIcon={<CgProfile />}>
          Sign Up
        </Button>
        <Button colorScheme='teal' size='md' rightIcon={<MdLogin />}>
          Log In
        </Button>
      </ButtonGroup> */}

      <ButtonGroup variant='outline' spacing='4'>
        <Link as={ReachLink} to='/signup'>
          <Button
            colorScheme='messenger'
            variant='outline'
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
            size='md'
            rightIcon={<MdLogin />}
          >
            Logged in
          </Button>
        </Link>
      </ButtonGroup>
      {/* <Link as={ReachLink} to='/user/:id'>
        /user/:id
      </Link> */}
    </Box>
  )
}

export default HomePage
