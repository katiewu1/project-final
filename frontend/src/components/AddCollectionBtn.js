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
  Image,
  Tooltip,
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import moment from 'moment'

import FormCollection from './FormCollection'
import Preview from './Preview'
import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const AddCollectionBtn = ({ userId }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))) // reset the time to 00:00
  const [sendTo, setSendTo] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const collection = {
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

  const addCollection = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      // collection is a Object already - don't need the {}!
      body: JSON.stringify(collection),
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.addCollection(data.response))
          // empty the input fields
          setTitle('')
          setDate(new Date(new Date().setHours(0, 0, 0, 0)))
          setSendTo('')
          setImage('')
          setMessage('')
          toast({
            title: 'Collection added.',
            description: "We've saved your collection for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
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
      <Tooltip
        hasArrow
        label='Create new OpenMe message'
        aria-label='A tooltip'
        bg='purple.300'
      >
        <Button
          mb='2'
          border='1px'
          borderColor='white'
          rightIcon={<SmallAddIcon />}
          onClick={onOpen}
        >
          <Image
            w='18px'
            h='18px'
            mr='6px'
            src='./assets/openme_icon.png'
            alt='OpenMe logo'
          />
          Add
        </Button>
      </Tooltip>

      {/* Render Modal only when the state isOpen is true */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <form
            onSubmit={(e) => {
              onClose()
              addCollection(e)
            }}
          >
            <ModalOverlay />
            <ModalContent maxW='800px'>
              <ModalHeader>Add Collection</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display='flex'
                flexDirection={['column', 'row', 'row']}
              >
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

export default AddCollectionBtn
