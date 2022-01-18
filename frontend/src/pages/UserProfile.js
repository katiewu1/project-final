import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import {
  Heading,
  Text,
  Stack,
  Flex,
  Box,
  Button,
  Avatar,
} from '@chakra-ui/react'
import { EditIcon, SmallAddIcon, DeleteIcon } from '@chakra-ui/icons'

// import { API_URL } from '../utils/urls'
import { API_URL_USER } from '../utils/urls'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null)

  // const accessToken = useSelector((store) => store.user.accessToken)

  useEffect(() => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     Authorization: accessToken,
    //   },
    // }

    // fetch(API_URL('poems'), options)
    // fetch(API_URL('users'))
    fetch(API_URL_USER('users', '61e5df19d37e482c297f9e06'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('data.response: ', data.response)
          setUserProfile(data.response)
        }
      })
  }, [])
  // }, [accessToken])

  console.log('userProfile: ', userProfile)
  // console.log('firstname: ', userProfile.firstname)
  // console.log('lastname: ', userProfile.lastname)
  if (userProfile) {
    console.log('firstname: ', userProfile.firstname)
    console.log('lastname: ', userProfile.lastname)
    for (const [key, value] of Object.entries(userProfile)) {
      console.log(`${key}: ${value}`)
    }
  }

  return (
    <section>
      <>
        <Heading as='h2' fontSize='5xl' m='2' isTruncated>
          My Profile
        </Heading>
        {userProfile && (
          <Flex align='center' justify='space-evenly'>
            <Avatar
              // bg='teal.500'
              size='xl'
              name={`${userProfile.firstname} ${userProfile.lastname}`} //fetch first- and lastname
              src='https://bit.ly/broken-link'
            />
            <Flex direction='column'>
              <Stack spacing={1}>
                <Text fontSize='md'>
                  Name: {userProfile.firstname} {userProfile.lastname}
                </Text>
                <Text fontSize='md'>Email: {userProfile.email}</Text>
                <Text fontSize='sm'>Change name, email and password?</Text>
              </Stack>
              <Button size='sm' w={60}>
                Edit profile <span>&nbsp;</span>
                <EditIcon w={4} h={4} />
              </Button>
              <Text>id: {userProfile._id}</Text>
            </Flex>
          </Flex>
        )}
        <Box mt='10'>
          <Text>
            Accordion? Show collection and put Edit and Delete after each
            collection?
          </Text>
          <Button>
            Create <SmallAddIcon w={4} h={4} />
          </Button>
          {/* map over each message from the DB */}
          <Button>Collection</Button>
          <Button>
            Edit <span>&nbsp;</span>
            <EditIcon w={4} h={4} />
          </Button>
          <Button>
            Delete <span>&nbsp;</span>
            <DeleteIcon w={4} h={4} />
          </Button>
        </Box>
      </>
    </section>
  )
}

export default UserProfile
