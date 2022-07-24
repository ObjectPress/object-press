// Chakra imports
import { Flex, Stack } from '@chakra-ui/react';
import BasicInfo from './components/BasicInfo';
import ChangePassword from './components/ChangePassword';
import Header from './components/Header';
import DeleteAccount from './components/DeleteAccount';

export default function Settings() {
  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      <Stack
        direction="column"
        spacing="24px"
        mt="40px"
        align={{ lg: 'center' }}
        justify={{ lg: 'center' }}
        w="100%"
      >
        <Header />
        <BasicInfo />
        <ChangePassword />
        <DeleteAccount />
      </Stack>
    </Flex>
  );
}
