// Chakra imports
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBlogs } from '@/store/blogs';
import BlogTable from './components/BlogTable';

export default function Blogs() {
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState(null);

  const getBlogs = async () => {
    const results = (await dispatch(fetchBlogs())).payload;

    setBlogData(results);
  };

  useEffect(() => {
    if (!blogData) {
      getBlogs();
    }
  }, [blogData]);

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <BlogTable
        title={'Blogs'}
        captions={['Name', 'Build Hook', 'Status', 'Created', '']}
        data={blogData}
      />
    </Flex>
  );
}
