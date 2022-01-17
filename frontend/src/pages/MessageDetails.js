import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MessageDetails = () => {
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [id])

  return (
    <section>
      <p>Message Details!</p>
    </section>
  )
}

export default MessageDetails
