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
          mt="3.5rem"
          mb="38px"
        >
          <Image src={Logo} h="175px" w="auto" />

          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            maxW="300px"
            // w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            Open source headless content management.
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="semibold"
            mt="10px"
            mb="26px"
            maxW="300px"
            // w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
          >
            Sign up for free today!
          </Text>
          <Flex bg={bgButtonGroup} borderRadius="12px">
            <Button
              as={Link}
              to="/login"
              variant="no-hover"
              w="135px"
              h="40px"
              fontSize="sm"
              boxShadow={
                activeButton.monthly
                  ? '0px 2px 5.5px rgba(0, 0, 0, 0.06)'
                  : 'none'
              }
              bg={activeButton.monthly ? bgActiveButton : 'transparent'}
              onClick={() => setActiveButton({ monthly: true, yearly: false })}
            >
              Sign In
            </Button>
          </Flex>

          <Flex
            direction="column"
            mb={{ sm: '20px', lg: '60px' }}
            mt={{ sm: '275px', md: '175px' }}
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
                fontSize="md"
                fontWeight="normal"
                maxW={{ sm: '300px', lg: '500px' }}
              >
                A lot of people don't appreciate the moment until it’s passed.
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
                    How do I order?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  We’re not always in the position that we want to be at. We’re
                  constantly growing. We’re constantly making mistakes. We’re
                  constantly trying to express ourselves and actualize our
                  dreams. If you have the opportunity to play this game of life
                  you need to appreciate every moment. A lot of people don’t
                  appreciate the moment until it’s passed.
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
                    How can i make the payment?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  It really matters and then like it really doesn’t matter. What
                  matters is the people who are sparked by it. And the people
                  who are like offended by it, it doesn’t matter. Because it's
                  about motivating the doers. Because I’m here to follow my
                  dreams and inspire other people to follow their dreams, too.
                  We’re not always in the position that we want to be at. We’re
                  constantly growing. We’re constantly making mistakes. We’re
                  constantly trying to express ourselves and actualize our
                  dreams. If you have the opportunity to play this game of life
                  you need to appreciate every moment. A lot of people don’t
                  appreciate the moment until it’s passed.
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
                    How much time does it take to receive the order?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  The time is now for it to be okay to be great. People in this
                  world shun people for being great. For being a bright color.
                  For standing out. But the time is now to be okay to be the
                  greatest you. Would you believe in what you believe in, if you
                  were the only one who believed it? If everything I did failed
                  - which it doesn't, it actually succeeds - just the fact that
                  I'm willing to fail is an inspiration. People are so scared to
                  lose that they don't even try. Like, one thing people can't
                  say is that I'm not trying, and I'm not trying my hardest, and
                  I'm not trying to do the best way I know how.
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
                    Can I resell the products?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  I always felt like I could do anything. That’s the main thing
                  people are controlled by! Thoughts- their perception of
                  themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you won’t
                  do anything. I was taught I could do everything. If everything
                  I did failed - which it doesn't, it actually succeeds - just
                  the fact that I'm willing to fail is an inspiration. People
                  are so scared to lose that they don't even try. Like, one
                  thing people can't say is that I'm not trying, and I'm not
                  trying my hardest, and I'm not trying to do the best way I
                  know how.
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
                    Where do I find the shipping details?
                  </Text>
                </Box>
                <AccordionIcon color="gray.500" />
              </AccordionButton>
              <AccordionPanel p="18px 0px 40px 0px">
                <Text
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  textAlign="left"
                  alignSelf="flex-start"
                  justifySelf="flex-start"
                >
                  There’s nothing I really wanted to do in life that I wasn’t
                  able to get good at. That’s my skill. I’m not really
                  specifically talented at anything except for the ability to
                  learn. That’s what I do. That’s what I’m here for. Don’t be
                  afraid to be wrong because you can’t learn anything from a
                  compliment. I always felt like I could do anything. That’s the
                  main thing people are controlled by! Thoughts- their
                  perception of themselves! They're slowed down by their
                  perception of themselves. If you're taught you can’t do
                  anything, you won’t do anything. I was taught I could do
                  everything.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Flex>
    </>
  );
}
