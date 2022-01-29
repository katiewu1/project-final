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
} from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineEdit } from 'react-icons/md'
import { AtSignIcon } from '@chakra-ui/icons'
import { RiLockPasswordFill } from 'react-icons/ri'

import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const EditProfile = ({ isOpen, onClose }) => {
  const userProfile = useSelector((store) => store.user)
  //   const userError = useSelector((store) => store.user.error)

  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

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

    fetch(API_URL_USER('user', '61e5df19d37e482c297f9e06'), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        batch(() => {
          dispatch(user.actions.setFirstname(data.response.firstname))
          dispatch(user.actions.setLastname(data.response.lastname))
          dispatch(user.actions.setEmail(data.response.email))
          dispatch(user.actions.setError(null))
        })
      })
  } // show a message when the request is succeeded? And show error messages?

  //   console.log('user error: ', userError)

  return (
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
              toast({
                title: 'Profile updated.',
                description: "We've saved your profile for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            }}
          >
            Save and exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
