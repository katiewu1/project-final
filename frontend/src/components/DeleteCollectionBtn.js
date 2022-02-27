import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import user from '../reducers/user'
import { API_URL_COLLECTION } from '../utils/urls'

const DeleteCollectionBtn = ({ collectionId }) => {
  const accessToken = useSelector((store) => store.user.accessToken)

  // Alert Dialog - Delete Collection
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const onCloseDelete = () => setIsOpenDelete(false)
  const cancelRefDelete = useRef()

  const dispatch = useDispatch()
  const toast = useToast()

  // Function to delete a Collection
  const handleDeleteCollection = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL_COLLECTION('user', id), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.deleteCollection(id))
          toast({
            title: 'Collection deleted.',
            description: "We've deleted your collection for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          dispatch(user.actions.setError(data.response))
          toast({
            title: 'Error.',
            description: "We'couldn't delete your collection for you",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      })
      .catch((err) => {
        toast({
          title: 'Error.',
          description: "We'couldn't delete your collection for you.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <Button
        size='sm'
        border='1px'
        borderColor='white'
        onClick={() => setIsOpenDelete(true)}
      >
        <DeleteIcon />
      </Button>
      {/* Alert Dialog - Delete Collection (render Alert Dialog only when the state isOpenDelete is true)  */}
      {isOpenDelete && (
        <AlertDialog
          isOpen
          leastDestructiveRef={cancelRefDelete}
          onClose={onCloseDelete}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Collection
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRefDelete} onClick={onCloseDelete}>
                  Cancel
                </Button>
                <Button
                  colorScheme='red'
                  onClick={() => {
                    onCloseDelete()
                    handleDeleteCollection(collectionId)
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </>
  )
}

export default DeleteCollectionBtn
