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
            <Th p='1' textAlign='start'>
              Title
            </Th>
            <Th p='1' textAlign='center'>
              Edit
            </Th>
            <Th p='1' textAlign='center'>
              Link
            </Th>
            <Th p='1' textAlign='center'>
              Email
            </Th>
            <Th p='1' textAlign='center'>
              Delete
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {userProfile.collections.map((collection) => (
            <Tr key={collection._id}>
              <Td p={['1', '2', '2']}>
                <Text
                  fontSize={['12px', '16px', '16px']}
                  // isTruncated
                  noOfLines='1'
                >
                  {collection.title}
                </Text>
                <Text
                  fontSize={['10px', '12px', '12px']}
                  fontStyle='italic'
                  color='gray'
                  noOfLines='1'
                >
                  Created at: {moment.utc(collection.createdAt).format('ll')}
                </Text>
              </Td>
              <Td p={['1', '2', '2']} textAlign='center'>
                <EditCollectionBtn collection={collection} />
              </Td>
              <Td p={['1', '2', '2']} textAlign='center'>
                <CopyLinkBtn collectionId={collection._id} />
              </Td>
              <Td p={['1', '2', '2']} textAlign='center'>
                <SendEmailBtn
                  collectionId={collection._id}
                  sendTo={collection.sendTo}
                  date={collection.date}
                />
              </Td>
              <Td p={['1', '2', '2']} textAlign='center'>
                <DeleteCollectionBtn collectionId={collection._id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th p='1' textAlign='start'>
              Title
            </Th>
            <Th p='1' textAlign='center'>
              Edit
            </Th>
            <Th p='1' textAlign='center'>
              Link
            </Th>
            <Th p='1' textAlign='center'>
              Email
            </Th>
            <Th p='1' textAlign='center'>
              Delete
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  )
}

export default TableCollections
