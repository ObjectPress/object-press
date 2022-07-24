// Chakra imports
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
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
          <Stack
            direction={{ sm: 'column', lg: 'row' }}
            spacing={{ sm: '24px', lg: '30px' }}
          >
            <FormControl w="40%">
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                I'm
              </FormLabel>
              <Select
                borderRadius="15px"
                placeholder="Male"
                color="gray.400"
                fontSize="xs"
              >
                <option value="option1">Male</option>
                <option value="option2">Female</option>
              </Select>
            </FormControl>
            <Stack
              direction="row"
              spacing={{ sm: '24px', lg: '30px' }}
              w="100%"
              align="center"
            >
              <FormControl minW={{ sm: '35%', lg: null }}>
                <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                  Birth Date
                </FormLabel>
                <Select borderRadius="15px" color="gray.400" fontSize="sm">
                  <option value="option1">January</option>
                  <option value="option2">February</option>
                  <option value="option3">March</option>
                  <option value="option4">April</option>
                  <option value="option5">May</option>
                  <option value="option6">June</option>
                  <option value="option7">July</option>
                  <option value="option8">August</option>
                  <option value="option9">September</option>
                  <option value="option10">October</option>
                  <option value="option11">November</option>
                  <option value="option12">December</option>
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  borderRadius="15px"
                  color="gray.400"
                  placeholder="1"
                  fontSize="xs"
                >
                  <option value="option2">2</option>
                  <option value="option3">3</option>
                  <option value="option4">4</option>
                  <option value="option5">5</option>
                  <option value="option6">6</option>
                  <option value="option7">7</option>
                  <option value="option8">-</option>
                </Select>
              </FormControl>
              <FormControl>
                <Select
                  borderRadius="15px"
                  color="gray.400"
                  placeholder="2010"
                  fontSize="xs"
                >
                  <option value="option2">2011</option>
                  <option value="option3">2012</option>
                  <option value="option4">2013</option>
                  <option value="option5">2014</option>
                  <option value="option6">2015</option>
                  <option value="option7">2016</option>
                  <option value="option8">2018</option>
                  <option value="option8">2019</option>
                  <option value="option8">2020</option>
                  <option value="option8">2021</option>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Email Address
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. esthera@address.com"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Confirmation Email
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. esthera@address.com"
                fontSize="xs"
              />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={{ sm: '24px', lg: '30px' }}>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Your Location
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. Bucharest"
                fontSize="xs"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Phone Number
              </FormLabel>
              <Input
                borderRadius="15px"
                placeholder="eg. +40 941 353 292"
                fontSize="xs"
              />
            </FormControl>
          </Stack>
          <Stack
            direction={{ sm: 'column', lg: 'row' }}
            spacing={{ sm: '24px', lg: '30px' }}
          >
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Language
              </FormLabel>
              <Select
                borderRadius="15px"
                placeholder="English"
                color="gray.400"
                fontSize="xs"
              >
                <option value="option1">French</option>
                <option value="option2">Spanish</option>
                <option value="option3">Romanian</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
                Skills
              </FormLabel>
              <Flex
                direction="row"
                p="12px"
                wrap="wrap"
                border="1px solid lightgray"
                borderRadius="15px"
                _focus={{ borderColor: 'teal.300' }}
                minH="60px"
                cursor="text"
              >
                {skills.map((skill, index) => {
                  return (
                    <Tag
                      minW="80px"
                      fontSize="xs"
                      h="25px"
                      mb="6px"
                      me="6px"
                      key={skill.id}
                      borderRadius="12px"
                      variant="solid"
                      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                    >
                      <TagLabel w="100%">{skill.name}</TagLabel>
                      <TagCloseButton
                        justifySelf="center"
                        onClick={() =>
                          setSkills([
                            ...skills.filter(
                              (element) => element.id !== skill.id
                            ),
                          ])
                        }
                      />
                    </Tag>
                  );
                })}
                <Input
                  borderRadius="15px"
                  border="none"
                  _focus="none"
                  p="0px"
                  onKeyDown={(e) => keyPress(e)}
                  fontSize="xs"
                />
              </Flex>
            </FormControl>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default BasicInfo;
