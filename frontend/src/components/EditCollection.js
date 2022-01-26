import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
} from '@chakra-ui/react'
import { ImImages } from 'react-icons/im'
import { MdTitle } from 'react-icons/md'
import { CalendarIcon } from '@chakra-ui/icons'

import { API_URL_COLLECTION } from '../utils/urls'

const EditCollection = (isOpen, onClose, collectionId) => {
  //   const editedCollection = useSelector((store) =>
  //     store.user.collections.filter((item) => item._id === collectionId)
  //   )
  //   console.log(editedCollection)

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  //   useEffect(() => {
  //     // const options = {
  //     //   method: 'GET',
  //     //   headers: {
  //     //     Authorization: accessToken,
  //     //   },
  //     // }
  //     fetch(API_URL_COLLECTION('user', collectionId))
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setTitle(data.response.title)
  //         setDate(data.response.date)
  //         setImage(data.response.image)
  //         setMessage(data.response.message)
  //       })
  //   }, [collectionId])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Edit your eMessage
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Save the collection and close the Modal -> make a confirm saving box? show/indicate the saving process? */}
          <Button variant='ghost' onClick={onClose}>
            Save and exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditCollection
