// Chakra imports
import {
  Flex,
  Grid,
  SimpleGrid,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
// assets
import BarChart from '@/components/Charts/BarChart';
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from '@/components/Icons/Icons';
import Activity from './components/Activity';
import MiniStatistics from './components/MiniStatistics';

export default function Dashboard() {
  const iconBoxInside = useColorModeValue('white', 'white');

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics
          title={"Today's Moneys"}
          amount={'$53,000'}
          percentage={55}
          icon={<WalletIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today's Users"}
          amount={'2,300'}
          percentage={5}
          icon={<GlobeIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'New Clients'}
          amount={'+3,020'}
          percentage={-14}
          icon={<DocumentIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'Total Sales'}
          amount={'$173,000'}
          percentage={8}
          icon={<CartIcon h={'24px'} w={'24px'} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Flex my="26px">
        <Activity
          title={`Posts: ${1900 + new Date().getYear()}`}
          percentage={23}
          chart={<BarChart />}
        />
      </Flex>
    </Flex>
  );
}
