import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react'

const NotFound = () => {
  const errorMessage = useSelector((store) => store.user.error)

  //   const navigate = useNavigate()

  console.log(errorMessage)

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      h='100vh'
      color='gray.700'
      fontWeight='bold'
      bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
    >
      <Text>
        The server is temporarily unavailable. If the problem continues, please
        contact the OpenMe team.
      </Text>
      {/* If we have error -> display the error message */}
      {errorMessage && (
        <Text fontSize='12px' fontStyle='italic' color='red'>
          *{errorMessage}
        </Text>
      )}
      <Text mt='4' fontStyle='italic'>
        openme.team@gmail.com
      </Text>
      {/* <Button onClick={() => navigate('/')}>Home</Button> */}
    </Box>
  )
}

export default NotFound
