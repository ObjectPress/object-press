import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import dayjs from 'dayjs';
// styled components
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import { Grid } from 'components/FlexBox/FlexBox';
import Checkbox from 'components/CheckBox/CheckBox';
import NoResult from 'components/NoResult/NoResult';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
  Category,
  Col,
  Row,
  Remove,
  themedUseStyletron,
} from './Blog.style';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  blogsFetchedSelector,
  blogsLoadingSelector,
  blogsSelector,
  fetchBlogs as fetchBlogsDispatch,
  removeBlog as removeBlogDispatch,
} from 'store/blogs';
import { Blog } from 'types';
import { useProgressDispatch, useProgressState } from 'context/ProgressContext';
import axios from 'axios';

export const Blogs: React.FC = () => {
  const drawerDispatch = useDrawerDispatch();
  const progressDispatch = useProgressDispatch();
  const confirmed = useProgressState('confirmed');
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkedId, setCheckedId] = useState<string>('');
  const isOpen = useDrawerState('isOpen');

  const openDrawer = useCallback(() => {
    drawerDispatch({ type: 'OPEN_DRAWER', drawerComponent: 'BLOG_FORM' });
    history.push('/new-blog');
  }, [drawerDispatch, history]);

  const [search, setSearch] = useState<string>('');
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

  const _blogs = useSelector(blogsSelector());
  const loading = useSelector(blogsLoadingSelector());
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetched = useSelector(blogsFetchedSelector());

  async function getBlogs() {
    const blogs = ((await dispatch(fetchBlogsDispatch())) as any)
      .payload as Blog[];

    setBlogs(blogs);
  }

  useEffect(() => {
    if (!fetched || !isOpen) {
      getBlogs();
    }
    // eslint-disable-next-line
  }, [fetched, isOpen]);

  useEffect(() => {
    if (_blogs?.length) {
      setBlogs(
        _blogs.filter((blog) => blog.title.toLowerCase().includes(search))
      );
    }
  }, [search, _blogs]);

  function handleSearch(event) {
    setSearch(event.currentTarget.value.toLowerCase());
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId?.includes(name)) {
      setCheckedId(name);
    } else {
      setCheckedId(null);
    }
  }

  function handleUpdate() {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'UPDATE_BLOG_FORM',
    });
    history.push(`/update-blog/${checkedId}`);
  }

  function handleRemove() {
    progressDispatch({
      type: 'OPEN_MODAL',
      progressComponent: 'CONFIRM_MODAL',
      confirmed: false,
    });
  }

  useEffect(() => {
    async function removeBlog() {
      await dispatch(removeBlogDispatch({ blogId: checkedId }));

      setCheckedId('');
      progressDispatch({
        type: 'CANCEL_MODAL',
        progressComponent: null,
        confirmed: false,
      });

      await getBlogs();
    }

    if (confirmed) {
      removeBlog();
    }
    // eslint-disable-next-line
  }, [checkedId, confirmed]);

  async function handleBuild() {
    try {
      let build: Blog;

      _blogs.forEach((blog) => {
        if (blog?.id === checkedId) {
          build = blog;
        }
        return;
      });

      await axios.post(build?.hook);

      progressDispatch({
        type: 'OPEN_TOAST',
        progressComponent: 'SUCCESS_TOAST',
      });

      await getBlogs();
    } catch {
      progressDispatch({
        type: 'OPEN_TOAST',
        progressComponent: 'ERROR_TOAST',
      });
    }
  }

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
              <Heading>Blogs</Heading>
            </Col>

            <Col md={11}>
              <Row>
                <Col md={4} lg={5}>
                  <Input
                    value={search}
                    placeholder="Search By Blog Title"
                    onChange={handleSearch}
                    clearable
                    endEnhancer={
                      <i
                        className="fas fa-search"
                        aria-label="search post"
                        style={{
                          cursor: 'pointer',
                          color: '#00d4b5',
                          paddingLeft: '15px',
                        }}
                      ></i>
                    }
                  />
                </Col>

                <Col md={2} lg={2}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => (
                      <i className="fas fa-plus" aria-label="new blog" />
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

                <Col md={2} lg={2}>
                  <Button
                    onClick={handleUpdate}
                    startEnhancer={() => (
                      <i className="fas fa-edit" aria-label="edit blog" />
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

                <Col md={2} lg={2}>
                  <Button
                    onClick={handleBuild}
                    startEnhancer={() => (
                      <i className="fas fa-link" aria-label="build hook" />
                    )}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                          backgroundColor: '#00d4b5',
                        }),
                      },
                    }}
                    disabled={checkedId?.length ? false : true}
                  >
                    Build
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
                <StyledHeadCell>Title</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Desciption</StyledHeadCell>
                <StyledHeadCell>Build Hook</StyledHeadCell>
                <StyledHeadCell>Create Date</StyledHeadCell>

                {!loading ? (
                  blogs.length ? (
                    blogs.map((blog, index) => (
                      <React.Fragment key={index}>
                        <StyledBodyCell>
                          <Checkbox
                            name={blog.id}
                            checked={checkedId?.includes(blog.id)}
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
                        </StyledBodyCell>
                        <StyledBodyCell>{blog.title}</StyledBodyCell>
                        <StyledBodyCell>
                          <Category className={blog.active ? active : pending}>
                            {blog.active ? 'Active' : 'Pending'}
                          </Category>
                        </StyledBodyCell>
                        <StyledBodyCell>
                          {blog?.description.length > 35
                            ? `${blog.description.substring(0, 35)}...`
                            : blog.description}
                        </StyledBodyCell>

                        <StyledBodyCell>
                          {blog?.hook.length > 35
                            ? `${blog?.hook.substring(0, 35)}...`
                            : blog.hook}
                        </StyledBodyCell>
                        <StyledBodyCell>
                          {dayjs(blog.createDate).format('MMM DD, YYYY')}
                        </StyledBodyCell>
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
};

export default Blogs;
