// Chakra imports
import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import avatar4 from '@/assets/img/avatars/avatar4.png';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import React, { useState } from 'react';

const Header = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgButton = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'gray.800'
  );
  const [toggle, setToggle] = useState(false);
  return (
    <Card
      w={{ sm: '100%', lg: '70%' }}
      alignSelf={{ lg: 'center' }}
      justifySelf={{ lg: 'center' }}
    >
      <CardBody>
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          w="100%"
        >
          <Flex align="center">
            <Avatar
              src={avatar4}
              w="80px"
              h="80px"
              me="22px"
              borderRadius="15px"
            />
            <Flex direction="column">
              <Text color={textColor} fontWeight="bold" fontSize="lg">
                Esthera Jackson
              </Text>
              <Text color="gray.400" fontWeight="normal" fontSize="sm">
                esthera@simmmple.com
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Header;
