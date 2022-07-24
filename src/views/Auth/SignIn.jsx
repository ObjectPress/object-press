import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  Spinner,
  Text,
  useColorModeValue,
  useConst,
} from '@chakra-ui/react';
// Assets
import BgSignUp from '@/assets/img/BgSignUp.webp';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@/graphql/mutations';
import { Helmet } from 'react-helmet';
import Notify from '@/components/Notify/Notify';

export default function SignIn() {
  const titleColor = useColorModeValue('teal.300', 'teal.200');
  const textColor = useColorModeValue('gray.700', 'white');
  const bgColor = useColorModeValue('white', 'gray.700');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [login] = useMutation(LOGIN_MUTATION);
  const history = useHistory();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.signIn(email, password);

      const { attributes } = await Auth.currentAuthenticatedUser();

      const { data } = await login({
        variables: {
          user: {
            email: attributes.email,
            userId: attributes.sub,
          },
        },
      });

      if (data?.loginUser?.accessToken) {
        localStorage.setItem('op-access-token', data.loginUser.accessToken);
        history.go(0);
      }
    } catch {
      setLoading(false);
      setIsOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Object Press</title>
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
          bgImage={BgSignUp}
          bgSize="cover"
          mx={{ md: 'auto' }}
          mt={{ md: '14px' }}
        ></Box>
        <Flex
          direction="column"
          textAlign="center"
          justifyContent="center"
          align="center"
          mt="6.5rem"
          mb="30px"
        >
          <Text fontSize="4xl" color="white" fontWeight="bold">
            Welcome!
          </Text>
          <Text
            fontSize="md"
            color="white"
            fontWeight="normal"
            mt="10px"
            mb="26px"
            w={{ base: '90%', sm: '60%', lg: '40%', xl: '30%' }}
          >
            Login or register to get started!
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            minW={{ sm: '90%', md: '445px' }}
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: '100px' }}
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Login
            </Text>
            <form onSubmit={signIn}>
              <FormControl isRequired>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  required
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="email"
                  placeholder="Your email address"
                  mb="24px"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
              </FormControl>
              <FormControl isRequired>
                <Input
                  required
                  fontSize="sm"
                  ms="4px"
                  borderRadius="15px"
                  type="password"
                  placeholder="Your password"
                  mb="24px"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  bg="teal.300"
                  fontSize="sm"
                  color="white"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="24px"
                  _hover={{
                    bg: 'teal.200',
                  }}
                  _active={{
                    bg: 'teal.400',
                  }}
                >
                  {!loading ? 'SIGN IN' : <Spinner color="white" />}
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text fontWeight="medium" fontSize="sm">
                Don't have an account?
                <Text
                  as={Link}
                  to="/register"
                  color={titleColor}
                  ms="5px"
                  fontWeight="bold"
                >
                  Sign Up
                </Text>
              </Text>
            </Flex>

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="24px"
            >
              <Text fontWeight="medium" fontSize="sm">
                Back to
                <Text
                  as={Link}
                  to="/"
                  color={titleColor}
                  ms="5px"
                  fontWeight="bold"
                >
                  Home
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Notify
        title="Error:"
        description="Invalid email or password"
        type="error"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
