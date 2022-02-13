import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Skeleton } from '@chakra-ui/react'

import ViewCollection from '../components/ViewCollection'
import { API_URL_OPEN } from '../utils/urls'

const Collection = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isLive, setIsLive] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
          setError(data.message)
          setCollection(null)
          setIsLive(true)
        }
      })
      .catch((err) => {
        setError(err.message)
        setCollection(null)
        setIsLive(false)
      })
      .finally(() => setIsLoading(false))
  }, [id, accessToken])

  return (
    <Skeleton
      isLoaded={!isLoading}
      h='calc(100vh - 18px)'
      startColor='purple.300'
      endColor='yellow.400'
    >
      <ViewCollection collection={collection} isLive={isLive} error={error} />
    </Skeleton>
  )
}

export default Collection
