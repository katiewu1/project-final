import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useDisclosure,
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
import { EditIcon } from '@chakra-ui/icons'
import moment from 'moment'
import { parseISO } from 'date-fns'

import FormCollection from './FormCollection'
import Preview from './Preview'
import { API_URL_COLLECTION } from '../utils/urls'
import user from '../reducers/user'

const EditCollectionBtn = ({ collection }) => {
  const [title, setTitle] = useState(collection.title)
  const [date, setDate] = useState(
    new Date(parseISO(collection.date).setHours(0, 0, 0, 0))
  ) // reset the time to 00:00
  const [sendTo, setSendTo] = useState(collection.sendTo)
  const [image, setImage] = useState(collection.image)
  const [message, setMessage] = useState(collection.message)

  const editedCollection = {
    title,
    // Change the date utc format to always be at 12:00 on that day
    date: moment(date).utcOffset(0, true).add(12, 'hours').format(),
    sendTo,
    image,
    message,
  }

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      body: JSON.stringify(editedCollection),
    }
    fetch(API_URL_COLLECTION('user', collection._id), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.editCollection(data.response))
          toast({
            title: 'Collection updated.',
            description: "We've saved your collection for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          dispatch(user.actions.setError(data.message))
          toast({
            title: 'Error.',
            description: "We'couldn't save your collection for you.",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        console.log('error: ', err)
        toast({
          title: 'Error.',
          description: "We'couldn't save your collection for you.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  } // TODO: error handling

  return (
    <>
      <Button
        size='sm'
        border='1px'
        borderColor='white'
        onClick={() => onOpen()}
      >
        <EditIcon />
      </Button>

      {/* Render Modal only when the state isOpen is true */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          {/* onSubmit: Close the Modal, save the collection -> successful: display toast */}
          <form
            onSubmit={(e) => {
              onClose()
              handleSaveCollection(e)
            }}
          >
            <ModalOverlay />
            <ModalContent maxW='800px'>
              <ModalHeader>Edit Collection</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display='flex'
                flexDirection={['column', 'row', 'row']}
              >
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
                <Button colorScheme='blue' type='submit'>
                  Save and exit
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}
    </>
  )
}

export default EditCollectionBtn
