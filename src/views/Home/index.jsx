import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import basic from '@/assets/img/BgSignUp.webp';
import Logo from '@/assets/img/logo-light.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const [activeButton, setActiveButton] = useState({
    monthly: true,
    yearly: false,
  });

  const textColor = useColorModeValue('gray.700', 'white');
  const bgActiveButton = useColorModeValue('#fff', 'gray.700');
  const bgButtonGroup = useColorModeValue('gray.50', 'gray.600');

  return (
    <>
      <Helmet>
        <title>Object Press | Open Source Headless Content Management</title>
      </Helmet>
      <Flex
        direction="column"
        alignSelf="center"
        justifySelf="center"
        overflow="hidden"
      >
        <Box
          position="absolute"
          minH={{ base: '70vh', md: '50vh' }}
          w={{ md: 'calc(100vw - 50px)' }}
          borderRadius={{ md: '15px' }}
          left="0"
          right="0"
          bgRepeat="no-repeat"
          overflow="hidden"
          zIndex="-1"
          top="0"
          bgImage={basic}
          bgSize="cover"
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        ></Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="175px"
          mb="38px"
        >
          <Image src={Logo} h="175px" w="auto" />

          <Flex
            direction="column"
            mb={{ sm: '20px', lg: '60px' }}
            mt={{ sm: '375px', md: '275px' }}
            w={{ sm: '300px', md: '650px', xl: '930px' }}
          >
            <Flex direction="column" align="center" justify="center">
              <Text
                color={textColor}
                fontWeight="bold"
                fontSize={{ sm: '3xl', md: '4xl' }}
                mb="12px"
              >
                v2.0 Coming Soon...
              </Text>

              <Text
                color="gray.400"
                fontSize="lg"
                fontWeight="normal"
                maxW={{ sm: '300px', lg: '500px' }}
              >
                Content Management Redefined
              </Text>
            </Flex>
          </Flex>

          <Accordion
            allowToggle
            w={{ sm: '300px', md: '650px', xl: '930px' }}
            mb="16px"
          >
            <AccordionItem border="none">
              <AccordionButton
                _focus="none"
                _hover="none"
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: 'xl', lg: '2xl' }}
                  >
                    Publishing Simplified
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="lg"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  Publish your creations on multiple platforms from one
                  location.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionButton
                _focus="none"
                _hover="none"
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: 'xl', lg: '2xl' }}
                  >
                    Make It Quick
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="lg"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  Collaborate with your team and have your content ready faster
                  than ever.
                </Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
              <AccordionButton
                _focus="none"
                _hover="none"
                p="40px 0px 20px 0px"
                borderBottom="1px solid lightgray"
              >
                <Box flex="1" textAlign="left">
                  <Text
                    color="gray.500"
                    fontWeight="bold"
                    fontSize={{ sm: 'xl', lg: '2xl' }}
                  >
                    Develop Your Way
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="lg"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  Build content in an environment suitable to your team, with
                  the framework you know best.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </>
  );
}
