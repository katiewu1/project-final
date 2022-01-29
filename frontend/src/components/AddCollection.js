import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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
  Textarea,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { ImImages } from 'react-icons/im'
import { MdTitle } from 'react-icons/md'
import { CalendarIcon } from '@chakra-ui/icons'

import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const AddCollection = ({ isOpen, onClose, userId, openEditMode }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const toast = useToast()

  const addCollection = () => {
    const options = {
      method: 'POST',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, image, message }),
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.addCollection(data.response))
        // empty the input fields
        setTitle('')
        setDate('')
        setImage('')
        setMessage('')
      })
  } // TODO: show a message when the request is succeeded? And show error messages?

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Customize your own surprise eMessage
          <Stack spacing={3}>
            <InputGroup>
              <FormLabel
                htmlFor='Title'
                display='flex'
                alignItems='center'
                w='100px'
              >
                Title
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={MdTitle} color='gray.300' />}
                />
                <Input
                  variant='outline'
                  id='title'
                  placeholder="Luna's Birthday"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
            </InputGroup>

            <InputGroup>
              <FormLabel
                htmlFor='date'
                display='flex'
                alignItems='center'
                w='100px'
              >
                Date
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<CalendarIcon color='gray.300' />}
                />
                <Input
                  variant='filled'
                  id='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </InputGroup>
            </InputGroup>

            <InputGroup>
              <FormLabel
                htmlFor='image'
                display='flex'
                alignItems='center'
                w='100px'
              >
                Image
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<Icon as={ImImages} color='gray.300' />}
                />
                <Input
                  variant='outline'
                  id='image'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </InputGroup>
            </InputGroup>

            <Flex>
              <FormLabel
                htmlFor='message'
                display='flex'
                alignItems='center'
                w='100px'
              >
                Message
              </FormLabel>
              <Textarea
                variant='filled'
                id='message'
                placeholder='Happy Birthday!'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Save the Collection, close the Modal, display toast */}
          <Button
            colorScheme='blue'
            onClick={() => {
              addCollection()
              onClose()
              toast({
                title: 'Collection added.',
                description: "We've saved your collection for you.",
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

export default AddCollection
