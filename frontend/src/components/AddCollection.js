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
  Text,
  Box,
  useToast,
} from '@chakra-ui/react'
import moment from 'moment'

import FormCollection from './FormCollection'
import Preview from './Preview'
import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const AddCollection = ({ isOpen, onClose, userId, openEditMode }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))) // reset the time to 00:00
  const [sendTo, setSendTo] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const collection = {
    title,
    // change the date utc format to always be at 12:00 on that day
    date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
    sendTo,
    image,
    message,
  }

  // console.log('date: ', date)
  // console.log('collection', collection)

  const dispatch = useDispatch()
  const toast = useToast()

  const addCollection = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        collection
        // title,
        // // change the date utc format to always be at 12:00 on that day
        // date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
        // sendTo,
        // image,
        // message,
      ),
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.addCollection(data.response))
        // empty the input fields
        setTitle('')
        setDate(new Date(new Date().setHours(0, 0, 0, 0)))
        setSendTo('')
        setImage('')
        setMessage('')
      })
  } // TODO: show a message when the request is succeeded? And show error messages?

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          addCollection(e)
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
        <ModalOverlay />
        <ModalContent maxW='800px'>
          <ModalHeader>Add Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb='4'>Create your own surprise OpenMe</Text>
              <FormCollection
                title={title}
                date={date}
                sendTo={sendTo}
                image={image}
                message={message}
                setTitle={setTitle}
                setDate={setDate}
                setSendTo={setSendTo}
                setImage={setImage}
                setMessage={setMessage}
              />
            </Box>
            {/* PREVIEW */}
            <Preview collection={collection} />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Save the Collection, close the Modal, display toast */}
            <Button colorScheme='blue' type='submit'>
              Save and exit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
    // <Modal isOpen={isOpen} onClose={onClose}>
    //   <ModalContent>
    //     <ModalBody>
    //       <Text mb='4'>Preview</Text>
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
  )
}

export default AddCollection
