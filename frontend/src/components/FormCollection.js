import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Textarea,
  Flex,
} from '@chakra-ui/react'
import { ImImages } from 'react-icons/im'
import { MdTitle } from 'react-icons/md'
import { CalendarIcon, AtSignIcon } from '@chakra-ui/icons'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'

const FormCollection = ({
  title,
  date,
  sendTo,
  image,
  message,
  setTitle,
  setDate,
  setSendTo,
  setImage,
  setMessage,
}) => {
  return (
    <Stack spacing={3}>
      <FormControl isRequired display='flex'>
        <FormLabel htmlFor='title' display='flex' alignItems='center' w='100px'>
          Title
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={MdTitle} color='gray.300' />}
          />
          <Input
            isRequired
            variant='outline'
            id='title'
            placeholder="Luna's Birthday"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired display='flex'>
        <FormLabel htmlFor='date' display='flex' alignItems='center' w='100px'>
          Date
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<CalendarIcon color='gray.300' />}
          />
          {/* <Input
        variant='filled'
        id='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /> */}

          <SingleDatepicker
            name='date-input'
            id='date'
            date={date}
            propsConfigs={{
              inputProps: {
                pl: 10,
              },
            }}
            onDateChange={setDate}
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired display='flex'>
        <FormLabel htmlFor='email' display='flex' alignItems='center' w='100px'>
          Send to
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<AtSignIcon color='gray.300' />}
          />
          <Input
            variant='outline'
            id='email'
            placeholder='email address'
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
          />
        </InputGroup>

        {/* <FormHelperText>Receiver's email address</FormHelperText> */}
      </FormControl>

      <InputGroup>
        <FormLabel htmlFor='image' display='flex' alignItems='center' w='100px'>
          Image
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={ImImages} color='gray.300' />}
          />
          <Input
            variant='outline'
            id='image'
            placeholder='copy image address'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </InputGroup>
      </InputGroup>

      <Flex>
        <FormLabel
          htmlFor='message'
          display='flex'
          alignItems='center'
          w='100px'
        >
          Message
        </FormLabel>
        <Textarea
          variant='filled'
          id='message'
          placeholder='Happy Birthday!'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Flex>
    </Stack>
  )
}

export default FormCollection