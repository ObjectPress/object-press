import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PostRow({
  name,
  description,
  title,
  status,
  date,
  id,
}) {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgStatus = 'gray.500';
  const colorStatus = 'white';

  return (
    <Tr>
      <Td minWidth={{ sm: '250px' }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color={bgStatus} fontWeight="normal">
              {description}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {title}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status ? 'green.400' : bgStatus}
          color={status ? 'white' : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status ? 'Active' : 'Pending'}
        </Badge>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {dayjs(date).format('MMM DD, YYYY')}
        </Text>
      </Td>
      <Td>
        <Button
          p="0px"
          colorScheme="teal"
          borderColor="teal.300"
          as={Link}
          to={`/blog/${id}`}
        >
          <Icon as={ArrowForwardIcon} />
        </Button>
      </Td>
    </Tr>
  );
}
