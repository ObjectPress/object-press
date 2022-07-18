// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Link,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Separator } from '../Separator/Separator';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Configurator(props) {
  const {
    secondary,
    isOpen,
    onClose,
    fixed,
    onTransparent,
    onOpaque,
    ...rest
  } = props;

  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };

  const { colorMode, toggleColorMode } = useColorMode();
  const settingsRef = useRef();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={'right'}
      finalFocusRef={settingsRef}
      blockScrollOnMount={false}
    >
      <DrawerContent>
        <DrawerHeader pt="24px" px="24px">
          <DrawerCloseButton />
          <Text fontSize="xl" fontWeight="bold" mt="16px">
            Object Press
          </Text>
          <Text fontSize="md" mb="16px">
            See your dashboard options.
          </Text>
          <Separator />
        </DrawerHeader>
        <DrawerBody w="340px" ps="24px" pe="40px">
          <Flex flexDirection="column">
            <Box>
              <Text fontSize="md" fontWeight="600">
                Sidenav Type
              </Text>
              <Text fontSize="sm" mb="16px">
                Choose between 2 different sidenav types.
              </Text>
              <Flex>
                <Button
                  w="50%"
                  p="8px 32px"
                  me="8px"
                  colorScheme="teal"
                  borderColor="teal.300"
                  color="teal.300"
                  variant="outline"
                  fontSize="sm"
                  onClick={onTransparent}
                >
                  Transparent
                </Button>
                <Button
                  type="submit"
                  bg="teal.300"
                  w="50%"
                  p="8px 32px"
                  me="8px"
                  mb={5}
                  _hover="teal.300"
                  color="white"
                  fontSize="sm"
                  onClick={onOpaque}
                >
                  Opaque
                </Button>
              </Flex>
            </Box>

            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb="24px"
              me="8px"
            >
              <Text fontSize="md" fontWeight="600" mb="4px">
                Dark/Light
              </Text>

              <Switch
                colorScheme="teal"
                size="lg"
                onChange={toggleColorMode}
                isChecked={colorMode === 'light' ? true : false}
              />
            </Flex>

            <Separator />

            <Box mt="24px">
              <Flex>
                <Button
                  w="50%"
                  p="8px 32px"
                  me="8px"
                  variant="outline"
                  fontSize="sm"
                  type="button"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>

                <Button
                  fontSize="sm"
                  p="8px 32px"
                  w="50%"
                  as={Link}
                  target="_blank"
                  href="https://docs.objectpress.io"
                >
                  Docs
                </Button>
              </Flex>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
