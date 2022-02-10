import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

import { API_URL_USER } from '../utils/urls'
import user from '../reducers/user'

const DeleteUserAccountBtn = () => {
  const userId = useSelector((store) => store.user.userId)
  const accessToken = useSelector((store) => store.user.accessToken)

  // Alert Dialog - Delete User Account
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const onCloseDelete = () => setIsOpenDelete(false)
  const cancelRefDelete = useRef()

  const dispatch = useDispatch()

  const handleDeleteAccount = () => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: accessToken,
      },
    }

    fetch(API_URL_USER('user', userId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If successful -> sign out and return to Home page
          dispatch(user.actions.signout())
        } else {
          dispatch(user.actions.setError(data.response))
        }
      })
      .catch((err) => console.log('error: ', err))
  }

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        bg='red.200'
        color='gray.700'
        fontSize='sm'
        _hover={{ bg: 'red.300' }}
        onClick={() => setIsOpenDelete(true)}
      >
        Want to delete your account?
      </Button>
      {/* Alert Dialog - Delete User Account (render Alert Dialog only when the state isOpenDelete is true)  */}
      {isOpenDelete && (
        <AlertDialog
          isOpen
          leastDestructiveRef={cancelRefDelete}
          onClose={onCloseDelete}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete User Account
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
                    handleDeleteAccount()
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

export default DeleteUserAccountBtn
