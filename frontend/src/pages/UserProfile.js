import React, { useState, useEffect } from 'react'
import { useDispatch, batch } from 'react-redux'
import {
  Heading,
  Text,
  Stack,
  Flex,
  Box,
  Button,
  Avatar,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { EditIcon, SmallAddIcon, DeleteIcon } from '@chakra-ui/icons'

// import { API_URL } from '../utils/urls'
import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null)

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const accessToken = useSelector((store) => store.user.accessToken)

  const dispatch = useDispatch()

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
          // console.log('data.response: ', data.response)
          setUserProfile(data.response)
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId))
            dispatch(user.actions.setFirstname(data.response.firstname))
            dispatch(user.actions.setLastname(data.response.lastname))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        }
      })
  }, [dispatch])
  // }, [accessToken])

  // if (editProfile) {
  //   fetch(API_URL_USER('users', '61e5df19d37e482c297f9e06'))
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {

  //       }
  //     })
  // }

  // console.log('userProfile: ', userProfile)
  if (userProfile) {
    // console.log('firstname: ', userProfile.firstname)
    // console.log('lastname: ', userProfile.lastname)
    // for (const [key, value] of Object.entries(userProfile)) {
    //   console.log(`${key}: ${value}`)
    // }
  }

  return (
    <Flex direction='column' justify='center' align='center' h='100vh'>
      <>
        <Heading as='h2' fontSize='5xl' m='2' isTruncated>
          My Profile
        </Heading>
        {userProfile && (
          <Flex align='center' justify='space-evenly' w='70%'>
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
              {/* EditProfile component -> with Modal */}
              <Button size='sm' w={60} onClick={onOpen}>
                Edit profile <span>&nbsp;</span>
                <EditIcon w={4} h={4} />
              </Button>

              <EditProfile isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
              {/* isOpen={isOpen} onOpen={onOpen} onClose={onClose} */}

              <Text>id: {userProfile._id}</Text>
            </Flex>
          </Flex>
        )}
        <Box mt='10'>
          <Text>
            Accordion? Show collection and put Edit and Delete after each
            collection? Modal/alert for edit and delete?
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
    </Flex>
  )
}

export default UserProfile
