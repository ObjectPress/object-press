import React, { useEffect, useState } from 'react';
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import { Header, Heading } from 'components/Wrapper.style';
import { Grid } from 'components/FlexBox/FlexBox';
import { LoaderItem, Row, Col } from './Gallery.style';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, searchPostsByBlog } from 'store/posts';
import { Post } from 'types';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import Fade from 'react-reveal/Fade';
import ProductCard from 'components/ProductCard/ProductCard';
import Placeholder from 'components/Placeholder/Placeholder';
import StickerLabel from 'components/Widgets/StickerCard/StickerLabel';
import NoResult from '../../components/NoResult/NoResult';

export default function Posts() {
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [blogsFetched, setBlogsFetched] = useState(false);
  const _blogs = useSelector(blogsSelector());
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [imageNum, setImageNum] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!_blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [blogsFetched, dispatch, _blogs]);

  useEffect(() => {
    if (search?.length === 0) {
      setImages([]);
      setIsLoading(true);
    }
  }, [search]);

  const handleSearch = async () => {
    const value = search;
    setImages([]);
    setIsLoading(true);

    if (value && value.length >= 2) {
      const posts = ((await dispatch(searchPosts(value))) as any)
        .payload as Post[];

      const content = posts?.map((post: any) => post.post);
      let gallery: string[] = [];
      let postArr: string[] = [];
      let altTags: string[] = [];
      let count: number[] = [];

      content?.forEach((post) => {
        if (post?.images[0]) {
          gallery.push(...post.images);
          post.images.forEach((item, index) => {
            postArr.push(post.title);
            if (postArr.includes(post.title)) {
              count.push(index + 1);
            } else {
              count.push(1);
            }
          });
        }

        if (post?.images[0] && post?.altTags?.length) {
          altTags.push(...post.altTags);
        } else if (post?.images[0]) {
          altTags.push('');
        }
      });

      if (gallery[0]) {
        setImages(gallery);
        setTags(altTags);
        setContent(postArr);
        setImageNum(count);
      }
    }

    setSearch(value);
    setSelectedBlog([]);
    setIsLoading(false);
  };

  const handleBlog = async ({ value }) => {
    setImages([]);
    setIsLoading(true);
    if (value.length) {
      const posts = ((await dispatch(searchPostsByBlog(value[0].id))) as any)
        .payload as Post[];

      const content = posts?.map((post: any) => post.post);
      let gallery: string[] = [];
      let postArr: string[] = [];
      let altTags: string[] = [];
      let count: number[] = [];

      content?.forEach((post) => {
        if (post?.images[0]) {
          gallery.push(...post.images);
          post.images.forEach((item, index) => {
            postArr.push(post.title);
            if (postArr.includes(post.title)) {
              count.push(index + 1);
            } else {
              count.push(1);
            }
          });
        }

        if (post?.images[0] && post?.altTags?.length) {
          altTags.push(...post.altTags);
        } else if (post?.images[0]) {
          altTags.push('');
        }
      });

      if (gallery[0]) {
        setImages(gallery);
        setTags(altTags);
        setContent(postArr);
        setImageNum(count);
      }
    }

    setSelectedBlog(value);
    setSearch('');
    setIsLoading(false);
  };
  console.log(images);

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
            }}
          >
            <Col md={1}>
              <Heading>Gallery</Heading>
            </Col>

            <Col md={11}>
              <Row>
                <Col md={2} lg={2}>
                  <Select
                    options={_blogs}
                    labelKey="title"
                    valueKey="id"
                    placeholder="Blog Title"
                    value={selectedBlog}
                    searchable={false}
                    onChange={handleBlog}
                  />
                </Col>

                <Col md={4} lg={5}>
                  <Input
                    value={search}
                    placeholder="Search By Post Title"
                    onChange={(e) => setSearch(e.target.value)}
                    clearable
                    minLength={2}
                    endEnhancer={
                      <i
                        className="fas fa-search"
                        aria-label="search post"
                        onClick={handleSearch}
                        style={{
                          cursor: search.length > 1 ? 'pointer' : '',
                          color: search.length > 1 ? '#00d4b5' : '',
                          paddingLeft: '15px',
                        }}
                      ></i>
                    }
                  />
                </Col>

                <Col>
                  <StickerLabel
                    title={`Total Images: ${images[0] ? images.length : 0}`}
                    icon={
                      <i
                        className="far fa-image fa-3x"
                        style={{
                          color: '#f8dac2',
                          marginRight: '10px',
                        }}
                      />
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Header>
          {!isLoading && images.length === 0 && <NoResult hideButton={false} />}
          <Row>
            {images[0] && !isLoading
              ? images.map((image: string, index: number) => {
                  return (
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      key={index}
                      style={{ margin: '15px 0' }}
                    >
                      <Fade bottom duration={800} delay={index * 10}>
                        <ProductCard
                          title={content[index]}
                          tag={tags[index]}
                          image={image}
                          index={imageNum[index]}
                          data={image}
                        />
                      </Fade>
                    </Col>
                  );
                })
              : isLoading && (
                  <>
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      style={{ margin: '15px 0' }}
                    >
                      <LoaderItem>
                        <Placeholder />
                      </LoaderItem>
                    </Col>
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      style={{ margin: '15px 0' }}
                    >
                      <LoaderItem>
                        <Placeholder />
                      </LoaderItem>
                    </Col>
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      style={{ margin: '15px 0' }}
                    >
                      <LoaderItem>
                        <Placeholder />
                      </LoaderItem>
                    </Col>
                    <Col
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                      style={{ margin: '15px 0' }}
                    >
                      <LoaderItem>
                        <Placeholder />
                      </LoaderItem>
                    </Col>
                  </>
                )}
          </Row>
        </Col>
      </Row>
    </Grid>
  );
}
