import React, { useCallback, useEffect, useState } from 'react';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import dayjs from 'dayjs';
// styled components
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Checkbox from 'components/CheckBox/CheckBox';
import { Wrapper, Header } from 'components/Wrapper.style';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
  Row,
  Col,
  Remove,
  Category,
  themedUseStyletron,
} from './Post.style';
import { Grid } from 'components/FlexBox/FlexBox';
import NoResult from 'components/NoResult/NoResult';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  postsLoadingSelector,
  fetchPosts,
  searchPosts,
  searchPostsByBlog,
  removePost as removePostDispatch,
} from 'store/posts';
import { Post } from 'types';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import { useProgressDispatch, useProgressState } from 'context/ProgressContext';

export default function Posts() {
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [search, setSearch] = useState('');
  const [useCss, theme] = themedUseStyletron();
  const active = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const pending = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });

  const drawerDispatch = useDrawerDispatch();
  const openDrawer = useCallback(() => {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'POST_FORM',
      backUrl: '/posts',
      newUrl: '/new-post',
    });
  }, [drawerDispatch]);

  const dispatch = useDispatch();
  const progressDispatch = useProgressDispatch();
  const confirmed = useProgressState('confirmed');

  const [checkedId, setCheckedId] = useState<string>('');
  const [postsFetched, setPostsFetched] = useState(false);
  const [blogsFetched, setBlogsFetched] = useState(false);
  const _blogs = useSelector(blogsSelector());
  const loading = useSelector(postsLoadingSelector());
  const [posts, setPosts] = useState<Post[]>([]);
  const isOpen = useDrawerState('isOpen');

  async function getPosts() {
    const posts = ((await dispatch(fetchPosts())) as any).payload as Post[];

    setPosts(posts);
    setPostsFetched(true);
  }

  useEffect(() => {
    if (!postsFetched || search?.length === 0) {
      getPosts();
    } else if (!isOpen && search?.length === 0) {
      getPosts();
    }
    // eslint-disable-next-line
  }, [postsFetched, search, isOpen]);

  useEffect(() => {
    if (!_blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [blogsFetched, dispatch, _blogs]);

  const handleSearch = async () => {
    const value = search;

    if (value && value?.length >= 2) {
      const posts = ((await dispatch(searchPosts(value))) as any)
        .payload as Post[];

      setPosts(posts);
    }

    setSearch(value);
    setSelectedBlog([]);
  };

  const handleSearchKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleBlog = async ({ value }) => {
    if (value.length) {
      const posts = ((await dispatch(searchPostsByBlog(value[0].id))) as any)
        .payload as Post[];

      setPosts(posts);
    } else {
      await getPosts();
    }

    setSelectedBlog(value);
    setSearch('');
  };

  const handleCheckbox = (event) => {
    const { name } = event.currentTarget;
    if (checkedId !== name) {
      setCheckedId(name);
    } else {
      setCheckedId(null);
    }
  };

  const handleUpdate = async () => {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'POST_UPDATE_FORM',
      backUrl: '/posts',
      newUrl: `/update-post/${checkedId}`,
    });
  };

  function handleRemove() {
    progressDispatch({
      type: 'OPEN_MODAL',
      progressComponent: 'CONFIRM_MODAL',
      confirmed: false,
    });
  }

  useEffect(() => {
    async function removePosts() {
      setPostsFetched(true);
      const posts = (
        (await dispatch(removePostDispatch({ postId: checkedId }))) as any
      ).payload as Post[];

      setPosts(posts);
      setCheckedId('');
      progressDispatch({
        type: 'CANCEL_MODAL',
        progressComponent: null,
        confirmed: false,
      });
      await getPosts();
    }

    if (confirmed) {
      removePosts();
    }
    // eslint-disable-next-line
  }, [checkedId, confirmed]);

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
            <Col md={12}>
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

                <Col md={3} lg={3}>
                  <Input
                    value={search}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search By Post Title"
                    onChange={(e) => setSearch(e.target.value)}
                    clearable
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

                <Col md={3} lg={3}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => (
                      <i className="fas fa-plus" aria-label="add post"></i>
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    New
                  </Button>
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={handleUpdate}
                    startEnhancer={() => (
                      <i className="fas fa-edit" aria-label="edit post"></i>
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                          backgroundColor: 'rgba(59, 130, 246, 1)',
                        }),
                      },
                    }}
                    disabled={checkedId?.length ? false : true}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto)minmax(150px, auto) minmax(200px, auto) minmax(150px, auto)">
                <StyledHeadCell
                  style={{
                    height: '100%',
                  }}
                >
                  {checkedId?.length ? (
                    <Remove onClick={handleRemove}>
                      <i
                        className="fas fa-trash fa-lg"
                        style={{
                          marginLeft: 5,
                          cursor: 'pointer',
                        }}
                      />
                    </Remove>
                  ) : (
                    <Remove>
                      <i
                        className="fas fa-trash fa-lg"
                        style={{
                          color: '#E6E6E6',
                          marginLeft: 5,
                          cursor: 'pointer',
                        }}
                      />
                    </Remove>
                  )}
                </StyledHeadCell>
                <StyledHeadCell>Post Title</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Description</StyledHeadCell>
                <StyledHeadCell>Last Modified</StyledHeadCell>
                <StyledHeadCell>Publish Date</StyledHeadCell>

                {!loading ? (
                  posts?.length ? (
                    posts.map((post, index) => (
                      <React.Fragment key={index}>
                        <StyledCell>
                          <Checkbox
                            name={post._id}
                            checked={checkedId?.includes(post._id)}
                            onChange={handleCheckbox}
                            overrides={{
                              Checkmark: {
                                style: {
                                  borderTopWidth: '2px',
                                  borderRightWidth: '2px',
                                  borderBottomWidth: '2px',
                                  borderLeftWidth: '2px',
                                  borderTopLeftRadius: '4px',
                                  borderTopRightRadius: '4px',
                                  borderBottomRightRadius: '4px',
                                  borderBottomLeftRadius: '4px',
                                },
                              },
                            }}
                          />
                        </StyledCell>
                        <StyledCell>{post.post.title}</StyledCell>
                        <StyledCell>
                          <Category className={post.active ? active : pending}>
                            {post.active ? 'Active' : 'Pending'}
                          </Category>{' '}
                        </StyledCell>
                        <StyledCell>
                          {post.post.description?.length > 30
                            ? `${post.post.description.substring(0, 30)}...`
                            : post.post.description}
                        </StyledCell>

                        <StyledCell>
                          {dayjs(post.modifiedDate).format(
                            'MMM DD, YYYY @ HH:mm'
                          )}
                        </StyledCell>
                        <StyledCell>
                          {dayjs(post.post.publishAt).format('MMM DD, YYYY')}
                        </StyledCell>
                      </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
