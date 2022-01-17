import React from 'react'
import { Button, Avatar } from '@chakra-ui/react'
import { EditIcon, SmallAddIcon, DeleteIcon } from '@chakra-ui/icons'

const UserProfile = () => {
  return (
    <section>
      <>
        <h2 style={{ fontSize: '2rem' }}>My Profile</h2>
        <Avatar
          // bg='teal.500'
          size='xl'
          name='Katie Wu' // fetch first- and lastname
          src='https://bit.ly/broken-link'
        />
        <div style={{ marginTop: '2rem' }}>
          <p>Fetch user info: name and email.</p>
          <p>
            Accordion? Show collection and put Edit and Delete after each
            collection?
          </p>
          <Button>
            Create <SmallAddIcon w={4} h={4} />
          </Button>
          {/* map over each message from the DB */}
          <Button>Collection</Button>
          <Button>
            Edit <span>&nbsp;</span>
            <EditIcon w={4} h={4} />
          </Button>
          <Button>
            Delete <span>&nbsp;</span>
            <DeleteIcon w={4} h={4} />
          </Button>
        </div>
      </>
    </section>
  )
}

export default UserProfile
