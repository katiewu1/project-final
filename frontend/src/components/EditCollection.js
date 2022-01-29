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

import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'

const EditCollection = ({ isOpen, onClose, collection }) => {
  //   const editedCollection = useSelector((store) =>
  //     store.user.collections.filter((item) => item._id === collectionId)
  //   )
  //   console.log(editedCollection)

  const [title, setTitle] = useState(collection.title)
  const [date, setDate] = useState(collection.date)
  const [image, setImage] = useState(collection.image)
  const [message, setMessage] = useState(collection.message)

  const dispatch = useDispatch()
  const toast = useToast()

  const handleSaveCollection = () => {
    const options = {
      method: 'PATCH',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, image, message }),
    }
    fetch(API_URL_COLLECTION('user', collection._id), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.editCollection(data.response))
        // reducer: dispatch
      })
  }

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
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Save the collection and close the Modal -> make a confirm saving box? show/indicate the saving process? */}
          <Button
            colorScheme='blue'
            onClick={() => {
              handleSaveCollection()
              onClose()
              toast({
                title: 'Collection updated.',
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

export default EditCollection
