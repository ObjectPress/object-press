// Chakra imports
import {
  Button,
  Flex,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';

const DeleteAccount = () => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card w={{ sm: '100%', lg: '70%' }} alignSelf="center" justifySelf="center">
      <CardHeader mb="40px">
        <Flex direction="column">
          <Text color={textColor} fontSize="lg" fontWeight="bold" mb="4px">
            Delete Account
          </Text>
          <Text color="gray.400" fontWeight="normal" fontSize="sm">
            Once you delete your account, there is no going back. Please be
            certain.
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          justify="space-between"
          align="start"
          w="100%"
        >
          <Flex align="center" mb={{ sm: '16px', lg: null }}>
            <Switch colorScheme="teal" me="22px" />
            <Flex direction="column">
              <Text
                fontSize="sm"
                color={textColor}
                mb="4px"
                fontWeight="semibold"
              >
                Confirm
              </Text>
              <Text color="gray.400" fontWeight="normal" fonSize="xs">
                I want to delete my account.
              </Text>
            </Flex>
          </Flex>
          <Flex align="center">
            <Button
              variant="solid"
              colorScheme="red"
              w="150px"
              h="35px"
              fontSize="xs"
            >
              DELETE ACCOUNT
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DeleteAccount;
