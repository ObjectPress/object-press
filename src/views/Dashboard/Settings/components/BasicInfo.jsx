// Chakra imports
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import React, { useState } from 'react';

const BasicInfo = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const [skills, setSkills] = useState([
    {
      name: 'chakra-ui',
      id: 1,
    },
    {
      name: 'react',
      id: 2,
    },
    {
      name: 'javascript',
      id: 3,
    },
  ]);
  return (
    <Card w={{ sm: '100%', lg: '70%' }} alignSelf="center" justifySelf="center">
      <CardHeader mb="40px">
        <Text color={textColor} fontSize="lg" fontWeight="bold">
          Basic Info
        </Text>
      </CardHeader>
      <CardBody>
        <Stack direction="column" spacing="20px" w="100%">
          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Username
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Bucharest"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Location
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. +40 941 353 292"
                fontSize="xs"
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                First Name
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Michael"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Last Name
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Jackson"
                fontSize="xs"
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Company
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Bucharest"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Title
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. +40 941 353 292"
                fontSize="xs"
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Website
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Bucharest"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. +40 941 353 292"
                fontSize="xs"
              />
            </FormControl>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BasicInfo;
