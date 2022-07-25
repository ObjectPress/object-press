// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import { BsCircleFill } from 'react-icons/bs';

const ChangePassword = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgButton = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'gray.800'
  );
  return (
    <Card w={{ sm: '100%', lg: '70%' }} alignSelf="center" justifySelf="center">
      <CardHeader mb="40px">
        <Text color={textColor} fontSize="lg" fontWeight="semibold">
          Change Password
        </Text>
      </CardHeader>
      <CardBody>
        <Stack direction="column" spacing="20px" w="100%">
          <FormControl>
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              Current Password
            </FormLabel>
            <Input
              borderRadius="15px"
              placeholder="Current Password"
              fontSize="xs"
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              New Password
            </FormLabel>
            <Input
              borderRadius="15px"
              placeholder="New Password"
              fontSize="xs"
              type="password"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="semibold" fontSize="xs" mb="10px">
              Confirm New Password
            </FormLabel>
            <Input
              borderRadius="15px"
              placeholder="Confirm New Password"
              fontSize="xs"
              type="password"
            />
          </FormControl>
          <Flex direction="column">
            <Text
              color={textColor}
              fontWeight="bold"
              fontSize="lg"
              mb="4px"
              mt="40px"
            >
              Password Requirements
            </Text>
            <Text color="gray.400" fontWeight="normal" fontSize="sm">
              Please follow this guide for a strong password.
            </Text>
          </Flex>
          <Flex
            direction={{ sm: 'column', lg: 'row' }}
            justify="space-between"
            w="100%"
          >
            <Stack
              direction="column"
              spacing="6px"
              mb={{ sm: '12px', lg: '0px' }}
            >
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  One special characters
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  Min 6 characters
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  One number (2 are recommended)
                </Text>
              </Flex>
              <Flex align="center">
                <Icon
                  as={BsCircleFill}
                  w="6px"
                  h="6px"
                  color="gray.500"
                  me="6px"
                />
                <Text color="gray.500" fontWeight="normal" fontSize="xs">
                  Change it often
                </Text>
              </Flex>
            </Stack>
            <Button
              variant="no-hover"
              bg={bgButton}
              w="150px"
              h="35px"
              alignSelf="center"
            >
              <Text fontSize="xs" color="#fff" fontWeight="bold">
                UPDATE PASSWORD
              </Text>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
