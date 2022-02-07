import React, { useState, useEffect } from 'react'
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
  Image,
} from '@chakra-ui/react'
import { EditIcon, SmallAddIcon } from '@chakra-ui/icons'
import { MdLogin } from 'react-icons/md'

import { API_URL_USER } from '../utils/urls'
// import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'
import AddCollection from '../components/AddCollection'
import TableCollections from '../components/TableCollections'
import EditCollection from '../components/EditCollection'

const UserProfile = () => {
  const userProfile = useSelector((store) => store.user)

  const [editingCollection, setEditingCollection] = useState(null)
  // const [deleteCollectionId, setDeleteCollectionId] = useState(null)

  // Modal - EditProfile, AddCollection and EditCollection
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

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // accessToken === null -> go to Home page
  useEffect(() => {
    if (!userProfile.accessToken) {
      navigate('/')
    }
  }, [userProfile.accessToken, navigate])

  // When user is logged in -> retrieve the data and update the Redux state/store
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
  }, [dispatch, userProfile.accessToken, userProfile.userId])

  // Function to edit a Collection
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
              name={`${userProfile.firstname} ${userProfile.lastname}`}
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
                  // TableCollections component -> Modal for EditCollection in UserProfile page
                  <TableCollections
                    userProfile={userProfile}
                    handleEditCollection={handleEditCollection}
                  />
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
