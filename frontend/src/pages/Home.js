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

  // If the user is logged in -> go to the user profile
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
      h='calc(100vh - 18px)'
    >
      <LightMode>
        <Box
          d='flex'
          flexDirection={['column', 'column', 'row']}
          justifyContent={['center', 'center', 'space-evenly']}
          alignItems={['center', 'center', 'space-evenly']}
          h={['70%', '60%', '60%']}
          w='100%'
          p='4'
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
        >
          <Box fontWeight='bold' p='4'>
            <Heading
              as='h1'
              fontSize='4xl'
              fontWeight='bolder'
              color='purple.300'
              textAlign={['center', 'center', 'start']}
            >
              OpenMe
            </Heading>
            <Text mt='3' fontSize='md' color='gray.700'>
              Customize your own surprise OpenMe to someone...
            </Text>
            <Text mt='1' fontSize='md' color='gray.700'>
              Write a Poem, send a Meme, pick a date to send an OpenMe!
            </Text>
            <ButtonGroup
              variant='outline'
              spacing='4'
              mt={['6', '6', '8']}
              display='flex'
              justifyContent={['center', 'center', 'start']}
            >
              <Link as={ReachLink} to='/signup'>
                <Button
                  colorScheme='purple'
                  variant='outline'
                  border='2px'
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
                  rightIcon={<MdLogin />}
                >
                  Log In
                </Button>
              </Link>
            </ButtonGroup>
          </Box>

          <Box
            border='4px'
            borderColor='white'
            borderRadius='10px'
            boxShadow='2xl'
            h={['40%', '40%', '90%']}
            w={['70%', '60%', '50%']}
            my={['4', '', '']}
            bgImage={[
              "url('/assets/mockup_phone.png')",
              "url('/assets/mockup_phone.png')",
              "url('/assets/mockup.png')",
            ]}
            bgPosition='center'
            bgRepeat='no-repeat'
            bgSize='cover'
          ></Box>
        </Box>
      </LightMode>
    </Box>
  )
}

export default Home
