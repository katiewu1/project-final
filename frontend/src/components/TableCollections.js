import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
} from '@chakra-ui/react'
import moment from 'moment'

import EditCollectionBtn from './EditCollectionBtn'
import CopyLinkBtn from './CopyLinkBtn'
import SendEmailBtn from './SendEmailBtn'
import DeleteCollectionBtn from './DeleteCollectionBtn'

const TableCollections = ({ userProfile }) => {
  return (
    <>
      <Table variant='striped' colorScheme='gray'>
        <TableCaption>Your saved collection(s)</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th textAlign='center'>Edit</Th>
            <Th textAlign='center'>Link</Th>
            <Th textAlign='center'>Email</Th>
            <Th textAlign='center'>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userProfile.collections.map((collection) => (
            <Tr key={collection._id}>
              <Td>
                <Text>{collection.title}</Text>
                <Text fontSize='xs' fontStyle='italic' color='gray'>
                  Created at: {moment.utc(collection.createdAt).format('ll')}
                </Text>
              </Td>
              <Td textAlign='center'>
                <EditCollectionBtn collection={collection} />
              </Td>
              <Td textAlign='center'>
                <CopyLinkBtn collectionId={collection._id} />
              </Td>
              <Td textAlign='center'>
                <SendEmailBtn
                  collectionId={collection._id}
                  sendTo={collection.sendTo}
                  date={collection.date}
                />
              </Td>
              <Td textAlign='center'>
                <DeleteCollectionBtn collectionId={collection._id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Title</Th>
            <Th textAlign='center'>Edit</Th>
            <Th textAlign='center'>Link</Th>
            <Th textAlign='center'>Email</Th>
            <Th textAlign='center'>Delete</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}

export default TableCollections
