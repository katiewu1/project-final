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
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/media-query'
import { EditIcon } from '@chakra-ui/icons'
import { MdLogin } from 'react-icons/md'

import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'
import EditProfile from '../components/EditProfile'
import AddCollectionBtn from '../components/AddCollectionBtn'
import TableCollections from '../components/TableCollections'

const UserProfile = () => {
  const userProfile = useSelector((store) => store.user)

  // Skeleton
  const [isLoading, setIsLoading] = useState(false)

  // Modal - EditProfile
  const {
    isOpen: isOpenEditProfile,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
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
    setIsLoading(true) // "activate" skeleton

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
      .catch((err) => console.log(err)) //TODO: error handling
      .finally(() => setIsLoading(false))
  }, [dispatch, userProfile.accessToken, userProfile.userId])

  return (
    <Flex
      direction='column'
      pt={['14vh', '20vh', '20vh']}
      align='center'
      minHeight='100vh'
    >
      <>
        <Heading as='h2' fontSize={['3xl', '5xl', '5xl']} m='2' isTruncated>
          My Profile
        </Heading>
        {userProfile && (
          <Flex
            align='center'
            justify='space-evenly'
            color='black'
            w={['95%', '80%', '80%']}
            p='48px 0px'
            borderRadius='6px'
            bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          >
            <SkeletonCircle isLoaded={!isLoading} size='20'>
              <Avatar
                size='xl'
                name={`${userProfile.firstname} ${userProfile.lastname}`}
              />
            </SkeletonCircle>
            <Flex direction='column'>
              <SkeletonText
                isLoaded={!isLoading}
                mt='2'
                noOfLines={3}
                spacing='4'
              >
                <Stack spacing={1}>
                  <Text fontSize={['sm', 'md', 'md']}>
                    Name: {userProfile.firstname} {userProfile.lastname}
                  </Text>
                  <Text fontSize={['sm', 'md', 'md']}>
                    Email: {userProfile.email}
                  </Text>
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
              </SkeletonText>
            </Flex>
          </Flex>
        )}
        <Box mt={['2', '10', '10']} w={['95%', '80%', '80%']}>
          <Skeleton isLoaded={!isLoading}>
            <AddCollectionBtn userId={userProfile.userId} />

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
                    // TableCollections component
                    <TableCollections userProfile={userProfile} />
                  ) : (
                    <Text>No collection(s) yet</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Skeleton>
        </Box>
      </>
    </Flex>
  )
}

export default UserProfile
