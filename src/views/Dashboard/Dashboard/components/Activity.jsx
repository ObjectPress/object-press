// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';

const Activity = ({ title, chart }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card p="16px">
      <CardBody>
        <Flex direction="column" w="100%">
          <Flex direction="column" alignSelf="flex-start">
            <Text fontSize="lg" mb="24px" color={textColor} fontWeight="bold">
              {title}
            </Text>
          </Flex>
          {chart}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Activity;
