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
import { parseISO } from 'date-fns'

import FormCollection from './FormCollection'
import Preview from './Preview'
import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'

const EditCollection = ({ isOpen, onClose, collection }) => {
  const [title, setTitle] = useState(collection.title)
  const [date, setDate] = useState(
    new Date(parseISO(collection.date).setHours(0, 0, 0, 0))
  ) // reset the time to 00:00
  const [sendTo, setSendTo] = useState(collection.sendTo)
  const [image, setImage] = useState(collection.image)
  const [message, setMessage] = useState(collection.message)

  const editedCollection = {
    title,
    // change the date utc format to always be at 12:00 on that day
    date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
    sendTo,
    image,
    message,
  }

  // console.log('date: ', date)
  // console.log('editedCollection: ', editedCollection)

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
      // editedCollection is a Object already - don't need the {}!
      body: JSON.stringify(
        editedCollection
        // title,
        // // change the date utc format to always be at 12:00 on that day
        // date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
        // sendTo,
        // image,
        // message,
      ),
    }
    fetch(API_URL_COLLECTION('user', collection._id), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(user.actions.editCollection(data.response))
      })
  } // TODO: error handling

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
        <ModalContent maxW='800px'>
          <ModalHeader>Edit Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb='4'>Edit your OpenMe</Text>
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
            <Preview collection={editedCollection} />
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
