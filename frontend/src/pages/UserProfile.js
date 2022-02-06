import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Heading,
  Text,
  Stack,
  Flex,
  Box,
  Button,
  ButtonGroup,
  Avatar,
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
  useToast,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { EditIcon, SmallAddIcon, DeleteIcon } from '@chakra-ui/icons'
import { MdLogin } from 'react-icons/md'
import moment from 'moment'

import { API_URL_USER } from '../utils/urls'
import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'
import AddCollection from '../components/AddCollection'
import EditCollection from '../components/EditCollection'
import CopyLinkBtn from '../components/CopyLinkBtn'
import SendEmailBtn from '../components/SendEmailBtn'

const UserProfile = () => {
  const userProfile = useSelector((store) => store.user)

  const [editingCollection, setEditingCollection] = useState(null)
  const [deleteCollectionId, setDeleteCollectionId] = useState(null)

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

  // Alert Dialog
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    // accessToken === null
    if (!userProfile.accessToken) {
      navigate('/')
    }
    // else if (userProfile.accessToken) {
    //   navigate('/user')
    // }
  }, [userProfile.accessToken, navigate])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: userProfile.accessToken,
      },
    }

    fetch(API_URL_USER('user', userProfile.userId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log('data.response: ', data.response)
          // setUserProfile(data.response)
          batch(() => {
            // dispatch(user.actions.setUserprofile(data.response))
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
  }, [dispatch, userProfile.accessToken, userProfile.userId])

  if (userProfile) {
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

  return (
    <Flex direction='column' pt='20vh' align='center' minHeight='100vh'>
      <>
        <Heading as='h2' fontSize='5xl' m='2' isTruncated>
          My Profile
        </Heading>
        {userProfile && (
          <Flex
            align='center'
            justify='space-evenly'
            color='black'
            w='80%'
            p='48px 0px'
            borderRadius='6px'
            bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          >
            <Avatar
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
              <ButtonGroup mt='2'>
                {/* EditProfile component -> with Modal */}
                <Button
                  variant='link'
                  size='sm'
                  color='teal'
                  rightIcon={<EditIcon />}
                  onClick={onOpenEditProfile}
                >
                  Edit profile
                </Button>

                <EditProfile
                  isOpen={isOpenEditProfile}
                  onClose={onCloseEditProfile}
                />
                <Button
                  variant='link'
                  size='sm'
                  color='teal'
                  rightIcon={<MdLogin />}
                  // border='1px'
                  onClick={() => dispatch(user.actions.signout())}
                >
                  Sign out
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
        )}
        <Box mt='10' w='80%'>
          {/* AddCollection component -> with Modal */}
          <Button
            mb='2'
            border='1px'
            borderColor='white'
            onClick={onOpenAddCollection}
          >
            <Image
              w='18px'
              h='18px'
              mr='4px'
              src='./assets/openme_icon.png'
              alt='OpenMe logo'
            />
            Add <SmallAddIcon w={4} h={4} />
          </Button>
          {userProfile && (
            <AddCollection
              isOpen={isOpenAddCollection}
              onClose={onCloseAddCollection}
              userId={userProfile.userId}
            />
          )}

          {/* defaultIndex={[0]} allowMultiple */}
          <Accordion allowToggle defaultIndex={[1]}>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{
                    bgGradient: 'linear(to-bl, pink.400,yellow.400)',
                  }}
                  _hover={{
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
                  // TODO: move out the Table to a component
                  <Table variant='striped' colorScheme='gray'>
                    <TableCaption>Your saved collection(s)</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Title</Th>
                        <Th textAlign='center'>Edit</Th>
                        <Th textAlign='center'>Link</Th>
                        <Th textAlign='center'>Email</Th>
                        <Th textAlign='center'>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userProfile.collections.map((collection) => (
                        <Tr key={collection._id}>
                          <Td>
                            <Text>{collection.title}</Text>
                            <Text fontSize='xs' fontStyle='italic' color='gray'>
                              Created at:{' '}
                              {moment.utc(collection.createdAt).format('ll')}
                            </Text>
                          </Td>
                          <Td textAlign='center'>
                            <Button
                              size='sm'
                              border='1px'
                              borderColor='white'
                              onClick={() => handleEditCollection(collection)}
                            >
                              <EditIcon />
                            </Button>
                          </Td>
                          <Td textAlign='center'>
                            <CopyLinkBtn collectionId={collection._id} />
                          </Td>
                          <Td textAlign='center'>
                            <SendEmailBtn
                              collectionId={collection._id}
                              sendTo={collection.sendTo}
                              date={collection.date}
                            />
                          </Td>
                          <Td textAlign='center'>
                            <Button
                              size='sm'
                              border='1px'
                              borderColor='white'
                              // colorScheme='red'
                              onClick={() => {
                                setIsOpen(true)
                                setDeleteCollectionId(collection._id)
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Title</Th>
                        <Th textAlign='center'>Edit</Th>
                        <Th textAlign='center'>Link</Th>
                        <Th textAlign='center'>Email</Th>
                        <Th textAlign='center'>Delete</Th>
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
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Collection
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => {
                    onClose()
                    handleDeleteCollection(deleteCollectionId)
                    toast({
                      title: 'Collection deleted.',
                      description: "We've deleted your collection for you.",
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    })
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </Flex>
  )
}

export default UserProfile
