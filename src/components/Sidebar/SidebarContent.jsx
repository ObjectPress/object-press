/*eslint-disable*/
// chakra imports
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import IconBox from '../Icons/IconBox';
import LogoText from '@/assets/img/logo-text.png';
import { Separator } from '../Separator/Separator';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ routes }) => {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = useState({});

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? 'active' : '';
  };
  const createLinks = (routes) => {
    // Chakra Color Mode
    const activeBg = useColorModeValue('white', 'gray.700');
    const inactiveBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');
    const inactiveColor = useColorModeValue('gray.400', 'gray.400');

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        var st = {};
        st[prop['state']] = !state[prop.state];
        return (
          <Box key={prop.name}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: '12px',
              }}
              mx="auto"
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py="12px"
            >
              {prop.name}
            </Text>
            {createLinks(prop.views)}
          </Box>
        );
      } else if (prop.layout === '/admin') {
        return (
          <NavLink to={prop.path} key={prop.name}>
            {activeRoute(prop.path) === 'active' ? (
              <Button
                boxShadow="md"
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg={activeBg}
                mb={{
                  xl: '12px',
                }}
                mx={{
                  xl: 'auto',
                }}
                ps={{
                  sm: '10px',
                  xl: '16px',
                }}
                py="12px"
                borderRadius="15px"
                _hover="none"
                w="100%"
                _active={{
                  bg: 'inherit',
                  transform: 'none',
                  borderColor: 'transparent',
                  boxShadow: 'md',
                }}
                _focus={{ boxShadow: 'md' }}
              >
                <Flex>
                  {typeof prop.icon === 'string' ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <IconBox
                      bg="teal.300"
                      color="white"
                      h="30px"
                      w="30px"
                      me="12px"
                    >
                      {prop.icon}
                    </IconBox>
                  )}
                  <Text color={activeColor} my="auto" fontSize="sm">
                    {prop.name}
                  </Text>
                </Flex>
              </Button>
            ) : (
              <Button
                boxSize="initial"
                justifyContent="flex-start"
                alignItems="center"
                bg="transparent"
                mb={{
                  xl: '12px',
                }}
                mx={{
                  xl: 'auto',
                }}
                py="12px"
                ps={{
                  sm: '10px',
                  xl: '16px',
                }}
                borderRadius="15px"
                _hover="none"
                w="100%"
                _active={{
                  bg: 'inherit',
                  transform: 'none',
                  borderColor: 'transparent',
                }}
              >
                <Flex>
                  {typeof prop.icon === 'string' ? (
                    <Icon>{prop.icon}</Icon>
                  ) : (
                    <IconBox
                      bg={inactiveBg}
                      color="teal.300"
                      h="30px"
                      w="30px"
                      me="12px"
                      boxShadow="md"
                    >
                      {prop.icon}
                    </IconBox>
                  )}
                  <Text color={inactiveColor} my="auto" fontSize="sm">
                    {prop.name}
                  </Text>
                </Flex>
              </Button>
            )}
          </NavLink>
        );
      }
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <>
      <Box pt={'25px'} mb="12px">
        <Link
          href={`https://www.objectpress.io`}
          display="flex"
          mb="17px"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={LogoText} w="auto" h="45px" />
        </Link>
        <Separator></Separator>
      </Box>
      <Stack direction="column" mb="40px">
        <Box>{links}</Box>
      </Stack>
    </>
  );
};

export default SidebarContent;
