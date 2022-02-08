import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineEdit } from 'react-icons/md'
import { AtSignIcon } from '@chakra-ui/icons'
import { RiLockPasswordFill } from 'react-icons/ri'

import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const EditProfile = ({ isOpen, onClose }) => {
  const userProfile = useSelector((store) => store.user)
  const userId = useSelector((store) => store.user.userId)
  const errorMessage = useSelector((store) => store.user.error)

  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  // Alert Dialog - Delete User account
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const onCloseDelete = () => setIsOpenDelete(false)
  const cancelRefDelete = useRef()

  const dispatch = useDispatch()
  const toast = useToast()

  // when we have data in the userProfile -> set firstname, lastname and email
  useEffect(() => {
    setFirstname(userProfile.firstname)
    setLastname(userProfile.lastname)
    setEmail(userProfile.email)
  }, [userProfile])

  const handleSaveProfile = () => {
    const options = {
      method: 'PATCH',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setFirstname(data.response.firstname))
            dispatch(user.actions.setLastname(data.response.lastname))
            dispatch(user.actions.setEmail(data.response.email))
            dispatch(user.actions.setError(null))
          })
          toast({
            title: 'Profile updated.',
            description: "We've saved your profile for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          batch(() => {
            // dispatch(user.actions.setFirstname(null))
            // dispatch(user.actions.setLastname(null))
            // dispatch(user.actions.setEmail(null))
            dispatch(user.actions.setError(data.message))
          })
          toast({
            title: 'Error.',
            description: "We couldn't save your changes for you.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
      .catch((err) => console.log('error: ', err))
  } // show a message when the request is succeeded? And show error messages?

  //   console.log('user error: ', userError)

  const handleDeleteAccount = () => {
    const options = {
      method: 'DELETE',
      // headers: {
      //   Authorization: accessToken,
      // },
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          // if successful -> sign out and return to Home page
          dispatch(user.actions.signout())
        } else {
          dispatch(user.actions.setError(data.message))
        }
      })
      .catch((err) => console.log('error: ', err))
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* TODO: add Delete user */}
            <Stack spacing={3}>
              <InputGroup>
                <FormLabel
                  htmlFor='firstname'
                  display='flex'
                  alignItems='center'
                  w='100px'
                >
                  Firstname
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={FaUserEdit} color='gray.300' />}
                  />
                  <Input
                    variant='outline'
                    id='firstname'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </InputGroup>
              </InputGroup>

              <InputGroup>
                <FormLabel
                  htmlFor='lastname'
                  display='flex'
                  alignItems='center'
                  w='100px'
                >
                  Lastname
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={MdOutlineEdit} color='gray.300' />}
                  />
                  <Input
                    variant='filled'
                    id='lastname'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </InputGroup>
              </InputGroup>

              <InputGroup>
                <FormLabel
                  htmlFor='email'
                  display='flex'
                  alignItems='center'
                  w='100px'
                >
                  Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AtSignIcon color='gray.300' />}
                  />
                  <Input
                    variant='outline'
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </InputGroup>

              <InputGroup>
                <FormLabel
                  htmlFor='password'
                  display='flex'
                  alignItems='center'
                  w='100px'
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={RiLockPasswordFill} color='gray.300' />}
                  />
                  <Input
                    variant='filled'
                    id='password'
                    type='password'
                    placeholder={'*'.repeat(10)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </InputGroup>
              <Button
                variant='ghost'
                size='sm'
                bg='red.200'
                color='gray.700'
                fontSize='sm'
                _hover={{ bg: 'red.300' }}
                onClick={() => setIsOpenDelete(true)}
              >
                Want to delete your account?
              </Button>
              {errorMessage && (
                <Text fontSize='12px' fontStyle='italic' color='red'>
                  *{errorMessage}
                </Text>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Save the User profile, close the Modal, display toast */}
            <Button
              colorScheme='blue'
              onClick={() => {
                handleSaveProfile()
                onClose()
              }}
            >
              Save and exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Dialog - Delete Collection (render Alert Dialog only when the state isOpenDelete is true)  */}
      {isOpenDelete && (
        <AlertDialog
          isOpen={isOpenDelete}
          leastDestructiveRef={cancelRefDelete}
          onClose={onCloseDelete}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete User Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRefDelete} onClick={onCloseDelete}>
                  Cancel
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => {
                    onCloseDelete()
                    handleDeleteAccount()
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  )
}

export default EditProfile
