import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  //   useDisclosure,
  Button,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react'
import { FaUserEdit } from 'react-icons/fa'
import { MdOutlineEdit } from 'react-icons/md'
import { AtSignIcon } from '@chakra-ui/icons'
import { RiLockPasswordFill } from 'react-icons/ri'

import { API_URL_USER } from '../utils/urls'

// import user from '../reducers/user'

const EditProfile = ({ isOpen, onOpen, onClose }) => {
  const userProfile = useSelector((store) => store.user)
  const [firstname, setFirstname] = useState(`${userProfile.firstname}`)
  const [lastname, setLastname] = useState(`${userProfile.lastname}`)
  const [email, setEmail] = useState(`${userProfile.email}`)
  const [password, setPassword] = useState(`${userProfile.password}`)

  //   console.log(userProfile)
  //   console.log('password.length: ', password.length) // always 9?

  //   const { isOpen, onClose } = useDisclosure()

  //   useEffect(() => {
  // if (!isSaving) return

  //     const options = {
  //       method: 'PATCH',
  //       headers: {
  //         // Authorization: accessToken,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ firstname, lastname, email, password }),
  //     }

  //     fetch(API_URL_USER('users', '61e5df19d37e482c297f9e06'), options)
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //   }, [])

  const handleSaveProfile = () => {
    const options = {
      method: 'PATCH',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    }

    fetch(API_URL_USER('users', '61e5df19d37e482c297f9e06'), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Lorem count={2} /> */}
          Modal
          <Stack spacing={3}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<Icon as={FaUserEdit} color='gray.300' />}
              />
              <Input
                variant='outline'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<Icon as={MdOutlineEdit} color='gray.300' />}
              />
              <Input
                variant='filled'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AtSignIcon color='gray.300' />}
              />
              <Input
                variant='outline'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<Icon as={RiLockPasswordFill} color='gray.300' />}
              />
              <InputGroup
                variant='filled'
                value={'*'.repeat(password.length)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={handleSaveProfile}>
            Save and exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
