// Chakra imports
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '@/store/posts';
import PostTable from './components/PostTable';

export default function Posts() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(null);

  const getPosts = async () => {
    const results = (await dispatch(fetchPosts())).payload;

    setPostData(results);
  };

  useEffect(() => {
    if (!postData) {
      getPosts();
    }
  }, [postData]);

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <PostTable
        title={'Posts'}
        captions={['Name', 'Page Title', 'Status', 'Created', '']}
        data={postData}
      />
    </Flex>
  );
}
