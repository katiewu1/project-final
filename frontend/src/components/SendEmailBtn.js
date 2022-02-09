import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react'
import { CheckIcon, EmailIcon } from '@chakra-ui/icons'

import { API_URL, API_URL_COLLECTION, API_URL_OPENME } from '../utils/urls'
import user from '../reducers/user'

const SendEmailBtn = ({ collectionId, sendTo, date }) => {
  const link = API_URL_OPENME(collectionId)

  // Retrieve the hasSentEmail boolean value from the Redux state with useSelector
  // Store the value with useState and if you change the value from false to true it'll update the send-button
  const [collectionHasSentEmail, setCollectionHasSentEmail] = useState(
    useSelector((store) =>
      store.user.collections.find((item) => item._id === collectionId)
    ).hasSentEmail
  )

  // Alert Dialog - Send Email to Recipient
  const [isOpenSendEmail, setIsOpenSendEmail] = useState(false)
  const onCloseSendEmail = () => setIsOpenSendEmail(false)
  const cancelRefSendEmail = useRef()

  const dispatch = useDispatch()
  const toast = useToast()

  const handleSend = () => {
    // POST request to send email
    const options_sendEmail = {
      method: 'POST',
      headers: {
        // Authorization: accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: sendTo,
        link,
        date,
      }),
    }

    fetch(API_URL('sendemail'), options_sendEmail)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: 'Sent.',
            description: "We've sent an email to the recipient.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })

          // TODO: setCollectionHasSentEmail(true), can skip the patch request here and do it in the BE instead

          // PATCH request to update the collection, property hasSentEmail
          const options = {
            method: 'PATCH',
            headers: {
              // Authorization: accessToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              hasSentEmail: true,
            }),
          }

          fetch(API_URL_COLLECTION('user', collectionId), options)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                dispatch(user.actions.editCollection(data.response))
                setCollectionHasSentEmail(true)
              }
            })
            .catch((err) => {
              console.log('error: ', err)
            })
        } else {
          toast({
            title: 'Error.',
            description: "We'couldn't sent an email to the recipient.",
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
          description: "We'couldn't sent an email to the recipient.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
    // TODO: error handling
  }

  return (
    <>
      <Button
        size='sm'
        fontSize={['12px', '14px', '14px']}
        border='1px'
        borderColor='white'
        onClick={() => setIsOpenSendEmail(true)}
        rightIcon={collectionHasSentEmail ? <CheckIcon /> : <EmailIcon />}
        color={collectionHasSentEmail && 'green'}
        disabled={collectionHasSentEmail}
      >
        {collectionHasSentEmail ? 'Sent' : 'Send'}
      </Button>

      {/* Alert Dialog - Send Email to Recipient (render Alert Dialog only when the state isOpenSendEmail is true) */}
      {isOpenSendEmail && (
        <AlertDialog
          isOpen
          leastDestructiveRef={cancelRefSendEmail}
          onClose={onCloseSendEmail}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Send Email to Recipient
              </AlertDialogHeader>

              <AlertDialogBody>
                <Text>
                  Do you want to send the OpenMe message now? Please check the
                  recipient's email address before sending.
                </Text>
                <Text mt='2'>You can't undo this action afterwards.</Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRefSendEmail} onClick={onCloseSendEmail}>
                  Cancel
                </Button>
                <Button
                  colorScheme='green'
                  onClick={() => {
                    onCloseSendEmail()
                    handleSend()
                  }}
                  ml={3}
                >
                  Send
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  )
}

export default SendEmailBtn
