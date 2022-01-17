import React from 'react'

import Form from '../components/Form'

const LogIn = () => {
  return (
    <section>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem' }}>
        Log In
      </h2>
      <Form mode={'login'} />
    </section>
  )
}

export default LogIn
