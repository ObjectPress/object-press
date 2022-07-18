import React, { useRef } from 'react';
// Chakra Imports
import { Button, useColorModeValue } from '@chakra-ui/react';
// Custom Icons
import { SettingsIcon } from '../Icons/Icons';

export default function FixedPlugin(props) {
  const { secondary, onChange, onOpen, onSwitch, fixed, ...rest } = props;
  // Chakra Color Mode
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  let bgButton = useColorModeValue('white', 'gray.600');

  const settingsRef = useRef();
  return (
    <Button
      h="52px"
      w="52px"
      onClick={onOpen}
      bg={bgButton}
      position="fixed"
      variant="no-hover"
      right={'35px'}
      bottom="30px"
      borderRadius="50px"
      boxShadow="lg"
      _hover={{ boxShadow: 'lg' }}
    >
      <SettingsIcon
        cursor="pointer"
        ref={settingsRef}
        color={navbarIcon}
        w="20px"
        h="20px"
      />
    </Button>
  );
}
