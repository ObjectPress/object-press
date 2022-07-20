// Chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export default function PostCard({ image, name, description }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
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
        <Box my="25px" position="relative" borderRadius="15px">
          <Image
            src={image}
            borderRadius="15px"
            mx="auto"
            h={{ sm: '100px', md: '150px' }}
            w="auto"
            maxWidth={{ sm: '100px', md: '150px' }}
          />
        </Box>
        <Flex
          direction="column"
          minHeight={{ sm: '100px', md: '150px' }}
          textAlign="center"
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
            {name}
          </Text>

          <Text fontSize="md" color="gray.500" fontWeight="400" mb="20px">
            {description}
          </Text>
        </Flex>
      </Flex>
    </Button>
  );
}
