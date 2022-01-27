import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
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
import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'
import AddCollection from '../components/AddCollection'
import EditCollection from '../components/EditCollection'

const UserProfile = () => {
  // const [userProfile, setUserProfile] = useState(null)
  // const [openEditMode, setOpenEditMode] = useState(false)

  const userProfile = useSelector((store) => store.user)

  const [editingCollection, setEditingCollection] = useState(null)

  // Modal
  const {
    isOpen: isOpenEditProfile,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
  } = useDisclosure()
  const {
    isOpen: isOpenAddCollection,
    onOpen: onOpenAddCollection,
    onClose: onCloseAddCollection,
  } = useDisclosure()
  const {
    isOpen: isOpenEditCollection,
    onOpen: onOpenEditCollection,
    onClose: onCloseEditCollection,
  } = useDisclosure()

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
    // fetch(API_URL('user'))
    fetch(API_URL_USER('user', '61e5df19d37e482c297f9e06'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log('data.response: ', data.response)
          // setUserProfile(data.response)
          batch(() => {
            dispatch(user.actions.setUserId(data.response._id))
            dispatch(user.actions.setFirstname(data.response.firstname))
            dispatch(user.actions.setLastname(data.response.lastname))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setCollections(data.response.collections))
            dispatch(user.actions.setAccessToken(data.response.accessToken))
            dispatch(user.actions.setError(null))
          })
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null))
            dispatch(user.actions.setFirstname(null))
            dispatch(user.actions.setLastname(null))
            dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setCollections(null))
            dispatch(user.actions.setAccessToken(null))
            dispatch(user.actions.setError(data.response.error))
          })
        }
      })
  }, [dispatch])
  // }, [accessToken])

  // console.log('userProfile: ', userProfile)
  if (userProfile) {
    // console.log('firstname: ', userProfile.firstname)
    // console.log('lastname: ', userProfile.lastname)
    // for (const [key, value] of Object.entries(userProfile)) {
    //   console.log(`${key}: ${value}`)
    // }
  }

  const handleDeleteCollection = (id) => {
    const options = {
      method: 'DELETE',
      // headers: {
      //   Authorization: accessToken,
      // },
    }

    return fetch(API_URL_COLLECTION('user', id), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.deleteCollection(id))
      })
  }

  const handleEditCollection = (collection) => {
    setEditingCollection(collection)
    onOpenEditCollection()
  }

  console.log('isOpen', isOpenEditCollection)

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
              <Button size='sm' w={60} onClick={onOpenEditProfile}>
                Edit profile <span>&nbsp;</span>
                <EditIcon w={4} h={4} />
              </Button>

              <EditProfile
                isOpen={isOpenEditProfile}
                onClose={onCloseEditProfile}
              />
              {/* isOpen={isOpen} onOpen={onOpen} onClose={onClose} */}

              <Text>id: {userProfile.userId}</Text>
            </Flex>
          </Flex>
        )}
        <Box mt='10' w='80%'>
          {/* <Button>
            Add <SmallAddIcon w={4} h={4} />
          </Button> */}

          {/* AddCollection component -> with Modal */}
          <Button onClick={onOpenAddCollection}>
            Add <SmallAddIcon w={4} h={4} />
          </Button>
          {userProfile && (
            <AddCollection
              isOpen={isOpenAddCollection}
              onClose={onCloseAddCollection}
              userId={userProfile.userId}
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
                {userProfile &&
                userProfile.collections &&
                userProfile.collections.length > 0 ? (
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
                            <Button
                              border='1px'
                              borderColor='white'
                              onClick={() => handleEditCollection(collection)}
                            >
                              <EditIcon w={4} h={4} />
                            </Button>
                          </Td>
                          <Td>
                            <Button
                              border='1px'
                              borderColor='white'
                              onClick={() =>
                                handleDeleteCollection(collection._id)
                              }
                            >
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
        {/* Modal */}
        {/* use key to reset the states in the EditCollection component when opening another collection */}
        {editingCollection && (
          <EditCollection
            key={editingCollection._id}
            isOpen={isOpenEditCollection}
            onClose={onCloseEditCollection}
            collection={editingCollection}
          />
        )}
      </>
    </Flex>
  )
}

export default UserProfile
