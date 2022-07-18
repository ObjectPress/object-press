// Chakra imports
import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import BlogRow from './BlogRow';

export default function BlogTable({ title, captions, data }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card overflowX={{ sm: 'scroll', xl: 'hidden' }} minH="575px">
      <CardHeader p="6px 0px 22px 0px">
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Button
            colorScheme="teal"
            borderColor="teal.300"
            color="teal.300"
            variant="outline"
            fontSize="xs"
            p="8px 32px"
          >
            NEW
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? '0px' : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((row) => {
                return (
                  <BlogRow
                    key={row.id}
                    name={row.title}
                    logo={row.logo}
                    description={row.description}
                    hook={row.hook}
                    status={row.active}
                    date={row.createDate}
                    id={row.id}
                  />
                );
              })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
