// Chakra imports
import { Flex, SimpleGrid } from '@chakra-ui/react';
// assets
import BarChart from '@/components/Charts/BarChart';
// Custom icons
import Activity from './components/Activity';
import MiniStatistics from './components/MiniStatistics';
import {
  FaBook,
  FaFileExport,
  FaFileImport,
  FaPhotoVideo,
} from 'react-icons/fa';

export default function Dashboard() {
  const iconBoxInside = 'white';

  return (
    <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <MiniStatistics
          title={'Total Blogs'}
          percentage={1}
          icon={<FaBook color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'Pending Posts'}
          percentage={-1}
          icon={<FaFileImport color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'Active Posts'}
          percentage={1}
          icon={<FaFileExport color={iconBoxInside} />}
        />
        <MiniStatistics
          title={'Total Images'}
          percentage={1}
          icon={<FaPhotoVideo color={iconBoxInside} />}
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
