import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Skeleton } from '@chakra-ui/react'

import ViewCollection from '../components/ViewCollection'
import { API_URL_OPEN } from '../utils/urls'

const Collection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isLive, setIsLive] = useState(null)
  const [error, setError] = useState(null)
  // Skeleton
  const [isLoading, setIsLoading] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken)

  console.log('accessToken: ', accessToken)

  useEffect(() => {
    setIsLoading(true) // "activate" skeleton

    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    }
    fetch(API_URL_OPEN(id), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCollection(data.response)
          setIsLive(true)
          setError(null)
        } else {
          console.log('data.success = false')
          setError(data.message)
          setCollection(null)
          setIsLive(true)
        }
      })
      .catch((err) => {
        console.log('error: ', err)
        setError(err.message)
        setCollection(null)
        setIsLive(false)
      }) //TODO: error handling
      .finally(() => setIsLoading(false))
  }, [id, accessToken])

  return (
    <Skeleton
      isLoaded={!isLoading}
      h='100vh'
      startColor='purple.300'
      endColor='yellow.400'
    >
      <ViewCollection collection={collection} isLive={isLive} error={error} />
    </Skeleton>
  )
}

export default Collection
