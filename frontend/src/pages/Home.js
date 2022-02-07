import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Link as ReachLink } from '@reach/router'
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  LightMode,
} from '@chakra-ui/react'

import { CgProfile } from 'react-icons/cg'
import { MdLogin } from 'react-icons/md'

const Home = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const navigate = useNavigate()

  // if the user is logged in -> go to the user profile
  useEffect(() => {
    if (accessToken) {
      navigate('/user')
    }
  }, [accessToken, navigate])

  return (
    <Box
      as='section'
      d='flex'
      justifyContent='center'
      alignItems='center'
      h='100vh'
    >
      <LightMode>
        <Box
          d='flex'
          justifyContent='space-evenly'
          alignItems='center'
          h='60%'
          w='100%'
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
        >
          <Box fontWeight='bold' color='black'>
            <Heading
              as='h1'
              fontSize='4xl'
              fontWeight='bolder'
              color='purple.400'
            >
              OpenMe
            </Heading>
            <Text mt='3' fontSize='md' color='gray.700'>
              Customize your own surprise OpenMe to someone...
            </Text>
            <Text mt='1' fontSize='md' color='gray.700'>
              Write a Poem, send a Meme, pick a date to send an OpenMe!
            </Text>
          </Box>

          <Box
            border='4px'
            borderColor='white'
            borderRadius='8px'
            h='90%'
            w='30%'
            d='flex'
            justifyContent='center'
            alignItems='center'
          >
            <ButtonGroup variant='outline' spacing='4'>
              <Link as={ReachLink} to='/signup'>
                <Button
                  colorScheme='purple'
                  variant='outline'
                  border='2px'
                  // size='md'
                  rightIcon={<CgProfile />}
                >
                  Sign Up
                </Button>
              </Link>
              <Link as={ReachLink} to='/login'>
                <Button
                  colorScheme='pink'
                  variant='outline'
                  border='2px'
                  // size='md'
                  rightIcon={<MdLogin />}
                >
                  Log In
                </Button>
              </Link>
            </ButtonGroup>
          </Box>
        </Box>
      </LightMode>
    </Box>
  )
}

export default Home
