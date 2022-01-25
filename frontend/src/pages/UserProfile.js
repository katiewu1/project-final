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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import { EditIcon, SmallAddIcon, DeleteIcon } from '@chakra-ui/icons'

// import { API_URL } from '../utils/urls'
import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'
import AddCollection from '../components/AddCollection'

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
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setFirstname(null))
            dispatch(user.actions.setLastname(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response.error))
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
            />
            <Flex direction='column'>
              <Stack spacing={1}>
                <Text fontSize='md'>
                  Name: {userProfile.firstname} {userProfile.lastname}
                </Text>
                <Text fontSize='md'>Email: {userProfile.email}</Text>
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
        <Box mt='10' w='80%'>
          {/* <Button>
            Add <SmallAddIcon w={4} h={4} />
          </Button> */}

          {/* AddCollection component -> with Modal */}
          <Button onClick={onOpen}>
            Add <SmallAddIcon w={4} h={4} />
          </Button>
          {userProfile && (
            <AddCollection
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              userId={userProfile._id}
            />
          )}

          <Text>Modal/alert for edit and delete?</Text>
          {/* defaultIndex={[0]} allowMultiple */}
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    bgGradient: 'linear(to-bl, pink.400,yellow.400)',
                  }}
                >
                  <Box
                    flex='1'
                    textAlign='left'
                    fontWeight='bold'
                    fontSize='lg'
                  >
                    Collections
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                {/* when userProfile is not null and we have collection(s) -> display it, otherwise show text No collection(s) yet */}
                {userProfile && userProfile.collections.length > 0 ? (
                  <Table variant='striped' colorScheme='gray'>
                    <TableCaption>Your saved collection(s)</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userProfile.collections.map((collection) => (
                        <Tr key={collection._id}>
                          <Td>
                            <Text>{collection.title}</Text>
                          </Td>
                          <Td>
                            <Button border='1px' borderColor='white'>
                              <EditIcon w={4} h={4} />
                            </Button>
                            {/* EditCollection -> with Modal */}
                            {/* <Button border='1px' borderColor='white' onClick={onOpen}>
                                  <EditIcon w={4} h={4} />
                                </Button>
                            <EditCollection isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
                          </Td>
                          <Td>
                            <Button border='1px' borderColor='white'>
                              <DeleteIcon w={4} h={4} />
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Title</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                ) : (
                  <Text>No collection(s) yet</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </>
    </Flex>
  )
}

export default UserProfile
