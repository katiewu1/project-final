import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ViewCollection from '../components/ViewCollection'
import { API_URL_OPEN } from '../utils/urls'

const Collection = () => {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    fetch(API_URL_OPEN(id))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCollection(data.response)
        } else {
          console.log('data.success = false')
        }
      })
      .catch((err) => console.log('error: ', err))
  }, [id])

  return <ViewCollection collection={collection} isLive={true} />
}

export default Collection
