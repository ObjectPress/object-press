// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
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
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="400">
            {description}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody px="5px" minHeight={{ sm: '200px', md: '400px' }}>
        <Grid
          templateColumns={{ sm: '1fr', md: '1fr 1fr', xl: 'repeat(4, 1fr)' }}
          templateRows={{ sm: '1fr 1fr 1fr auto', md: '1fr 1fr', xl: '1fr' }}
          gap="24px"
        >
          <Button
            p="0px"
            bg="transparent"
            color="gray.500"
            border="1px solid lightgray"
            borderRadius="15px"
            minHeight="100%"
            minWidth={{ sm: '200px', md: '400px' }}
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
        </Grid>
      </CardBody>
    </Card>
  );
}
