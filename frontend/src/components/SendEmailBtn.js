import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { CheckIcon, EmailIcon } from '@chakra-ui/icons'

import { API_URL, API_URL_COLLECTION, API_URL_OPENME } from '../utils/urls'
import user from '../reducers/user'

const SendEmailBtn = ({ collectionId, sendTo, date }) => {
  const link = API_URL_OPENME(collectionId)
  // retrieve the boolean from the store user.collections -> map -> collectionId === ._id
  //   hasSentEmail = true
  //   const { hasSent, onSend } = useState(null)

  const collection = useSelector((store) =>
    store.user.collections.filter((item) => item._id === collectionId)
  )

  //   console.log(collection[0].hasSentEmail)

  const dispatch = useDispatch()

  const handleSend = () => {
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
        console.log(data)
        // onSend(true)
      })

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
        console.log(data)
        dispatch(user.actions.editCollection(data.response))
      })
  }

  return (
    <Button
      size='sm'
      border='1px'
      borderColor='white'
      onClick={() => handleSend()}
      rightIcon={collection[0].hasSentEmail ? <CheckIcon /> : <EmailIcon />}
      color={collection[0].hasSentEmail && 'green'}
      disabled={collection[0].hasSentEmail}
    >
      {collection[0].hasSentEmail ? 'Sent' : 'Send'}
    </Button>
  )
}

export default SendEmailBtn
