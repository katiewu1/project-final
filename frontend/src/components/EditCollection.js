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
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Textarea,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { ImImages } from 'react-icons/im'
import { MdTitle } from 'react-icons/md'
import { CalendarIcon, AtSignIcon } from '@chakra-ui/icons'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import moment from 'moment'
import { parseISO } from 'date-fns'

import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'

const EditCollection = ({ isOpen, onClose, collection }) => {
  const [title, setTitle] = useState(collection.title)
  const [date, setDate] = useState(parseISO(collection.date))
  const [sendTo, setSendTo] = useState(collection.sendTo)
  const [image, setImage] = useState(collection.image)
  const [message, setMessage] = useState(collection.message)

  const dispatch = useDispatch()
  const toast = useToast()

  const handleSaveCollection = (e) => {
    e.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        // change the date utc format to always be at 12:00 on that day
        date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
        sendTo,
        image,
        message,
      }),
    }
    fetch(API_URL_COLLECTION('user', collection._id), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.editCollection(data.response))
      })
  } // TODO: error handling

  console.log('date', moment(date).utcOffset(0, true).add(12, 'hours').format())

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          handleSaveCollection(e)
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='4'>Edit your OpenMe</Text>

            <Stack spacing={3}>
              <FormControl isRequired>
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
              </FormControl>

              <FormControl isRequired>
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
                    {/* <Input
                  variant='filled'
                  id='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                /> */}
                    <SingleDatepicker
                      name='date-input'
                      id='date'
                      date={date}
                      propsConfigs={{
                        inputProps: {
                          pl: 10,
                        },
                      }}
                      onDateChange={setDate}
                    />
                  </InputGroup>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <InputGroup>
                  <FormLabel
                    htmlFor='email'
                    display='flex'
                    alignItems='center'
                    w='100px'
                  >
                    Send to
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AtSignIcon color='gray.300' />}
                    />
                    <Input
                      variant='outline'
                      id='email'
                      placeholder='email address'
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                    />
                  </InputGroup>
                </InputGroup>
              </FormControl>

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
            {/* Save the collection, close the Modal, display toast */}
            <Button colorScheme='blue' type='submit'>
              Save and exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default EditCollection
