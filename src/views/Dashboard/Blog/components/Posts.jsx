// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PostCard from './PostCard';

export default function Posts({ title, description, data }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card p="16px">
      <CardHeader p={{ sm: '5px', md: '12px' }} mb="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            {description}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody
        p={{ sm: '5px', md: '12px' }}
        minHeight={{ sm: '275px', md: '400px' }}
        minWidth={{ sm: '275px', md: '400px' }}
      >
        <Stack gap="24px" w="100%" direction={{ sm: 'column', md: 'row' }}>
          <Button
            p="0px"
            bg="transparent"
            color="gray.500"
            border="1px solid lightgray"
            borderRadius="15px"
            h={{ sm: '275px', md: '400px' }}
            w={{ sm: '100%', md: '400px' }}
          >
            <Flex direction="column" justifyContent="center" align="center">
              <Icon as={FaPlus} fontSize="lg" mb="12px" />
              <Text fontSize="lg" fontWeight="bold">
                New Post
              </Text>
            </Flex>
          </Button>
          {data &&
            data.map((card) => {
              return (
                <PostCard
                  image={card.post.images[0]}
                  name={card.post.title}
                  description={card.post.description}
                />
              );
            })}
        </Stack>
      </CardBody>
    </Card>
  );
}
