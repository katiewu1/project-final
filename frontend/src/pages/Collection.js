import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ViewCollection from '../components/ViewCollection'
import { API_URL_OPEN } from '../utils/urls'

const Collection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isLive, setIsLive] = useState(null)
  const [error, setError] = useState(null)
  const accessToken = useSelector((store) => store.user.accessToken)

  console.log('accessToken: ', accessToken)
  useEffect(() => {
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
      })
  }, [id, accessToken])

  return (
    <ViewCollection collection={collection} isLive={isLive} error={error} />
  )
}

export default Collection
