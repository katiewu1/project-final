import React, { useState, useEffect } from 'react'
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
  Text,
} from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineEdit } from 'react-icons/md'
import { AtSignIcon } from '@chakra-ui/icons'
import { RiLockPasswordFill } from 'react-icons/ri'

import { API_URL_USER } from '../utils/urls'
import DeleteUserAccountBtn from './DeleteUserAccountBtn'
import user from '../reducers/user'

const EditProfile = ({ isOpen, onClose }) => {
  const userProfile = useSelector((store) => store.user)
  const userId = useSelector((store) => store.user.userId)
  const errorMessage = useSelector((store) => store.user.error)

  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch()
  const toast = useToast()

  // When we have data in the userProfile -> set firstname, lastname and email
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
          toast({
            title: 'Error.',
            description: "We couldn't save your changes for you.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
      .catch((err) => dispatch(user.actions.setError(err)))
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

              <DeleteUserAccountBtn />

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
            {/* Close the Modal, save the User profile */}
            <Button
              colorScheme='blue'
              onClick={() => {
                onClose()
                handleSaveProfile()
              }}
            >
              Save and exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfile
