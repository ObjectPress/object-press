import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchPostsByBlog } from '@/store/posts';
import Posts from './components/Posts';

export default function Blog() {
  const [postData, setPostData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getPosts = async (id) => {
    const posts = (await dispatch(searchPostsByBlog(id))).payload;

    setPostData(posts);
  };

  useEffect(() => {
    if (!postData && id) {
      getPosts(id);
    }
  }, [postData, id]);

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Posts title={'Posts'} description={'Blog Posts'} data={postData} />
    </Flex>
  );
}
