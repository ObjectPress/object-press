import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import {
  FormFields,
  FormLabel,
  Message,
  Error,
} from 'components/FormFields/FormFields';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
import MDEditor from '@uiw/react-md-editor';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { slugify } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import { editPost, fetchPost } from 'store/posts';
import { Post } from 'types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFormControl from 'hooks/useFormControl';
import { FormControl } from 'baseui/form-control';
import {
  validatePostTitle,
  validatePageTitle,
  validateDescription,
} from '../../utils';
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
import { CustomSelect } from 'components/Select/CustomSelect';
import { useDrawerDispatch } from 'context/DrawerContext';

interface Props {
  onClose: CloseDrawer;
}

const options = [
  { value: true, name: 'Active' },
  { value: false, name: 'Pending' },
];

const NewPostForm: React.FC<Props> = ({ onClose }) => {
  const drawerDispatch = useDrawerDispatch();
  const { id } = useParams<{ id: string }>();
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isMdEditorVisited, setIsMdEditorVisited] = useState<boolean>(false);
  const [active, setActive] = useState([]);
  const [altTags, setAltTags] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [publishDate, setPublishDate] = useState<any>(new Date());

  const dispatch = useDispatch();

  const blogs = useSelector(blogsSelector());
  const [blogsFetched, setBlogsFetched] = useState(false);

  const openDrawer = useCallback(() => {
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'MANAGE_IMAGES',
      backUrl: '/posts',
      newUrl: `/manage-post-images/${id}`,
    });
  }, [drawerDispatch, id]);

  useEffect(() => {
    if (!blogs.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, blogsFetched]);

  useEffect(() => {
    if (blogs?.length) {
      _fetchPost();
    }
    //eslint-disable-next-line
  }, [blogs]);

  const _fetchPost = async () => {
    const post = ((await dispatch(fetchPost(id))) as any).payload as
      | Post
      | undefined;

    if (post) {
      const {
        title,
        publishAt,
        pageTitle,
        content,
        description,
        keywords,
        images,
        altTags,
      } = post.post;

      setInitialPostTitle(title);
      setPublishDate(new Date(publishAt));
      setInitialPageTitle(pageTitle);
      setSlug(slugify(pageTitle));
      setContent(content);
      setInitialDescription(description);
      setActive(options.filter((o) => o.value === post.active));
      setKeywords(keywords);
      setBlogId(blogs.filter((b) => b.id === post.appId));
      setImages(images);
      setAltTags(altTags);
    }
  };

  const {
    value: newPostTitle,
    isValid: postTitleIsValid,
    onInputChangeHandler: onNewPostTitleChangeHandler,
    onInputBlurHandler: onNewPostTitleBlurHandler,
    shouldShowError: shouldNewPostTitleShowError,
    setInitialValue: setInitialPostTitle,
  } = useFormControl(validatePostTitle);
  const {
    value: newPageTitle,
    isValid: pageTitleIsValid,
    onInputChangeHandler: onNewPageTitleChangeHandler,
    onInputBlurHandler: onNewPageTitleBlurHandler,
    shouldShowError: shouldNewPageTitleShowError,
    setInitialValue: setInitialPageTitle,
  } = useFormControl(validatePageTitle);
  const {
    value: newDescription,
    isValid: newDescriptionIsValid,
    onInputChangeHandler: onNewDescriptionChangeHandler,
    onInputBlurHandler: onNewDescriptionBlurHandler,
    shouldShowError: shouldNewDescriptionShowError,
    setInitialValue: setInitialDescription,
  } = useFormControl(validateDescription);

  const isMdEditorValid = content.length > 0;
  const shouldMdEditorShowError = isMdEditorVisited && !isMdEditorValid;

  const isFormValid: boolean =
    postTitleIsValid &&
    pageTitleIsValid &&
    isMdEditorValid &&
    newDescriptionIsValid &&
    blogId[0]?.id?.length > 10 &&
    active[0]?.value !== undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isMdEditorValid) {
      setIsMdEditorVisited(true);
      return;
    }

    setLoading(true);

    if (isFormValid) {
      try {
        await dispatch(
          editPost({
            post: {
              postId: id,
              post: {
                title: newPostTitle,
                publishAt: publishDate.toISOString(),
                content,
                pageTitle: newPageTitle,
                slug: slugify(newPageTitle),
                keywords,
                description: newDescription,
                images: images?.length ? images : [''],
                altTags: altTags?.length ? altTags : [''],
              },
              active: active[0].value,
            },
          })
        );

        onClose();
      } catch (e) {
        console.log(e);
      }
    }

    setLoading(false);
  };

  const handleActiveChange = ({ value }) => {
    setActive(value);
  };

  const handleKeywordChange = (value: string) => {
    console.log(value);
    setKeywords(value);
  };

  const onMdEditorChangeHandler = (value: string) => {
    if (!isMdEditorVisited) {
      setIsMdEditorVisited(true);
    }

    setContent(value!);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Post</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit}
        style={{ height: '100%', backgroundColor: '#f7f7f7' }}
      >
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Specifies the Blog this Post belongs to
              </FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Blog</FormLabel>
                  <CustomSelect
                    options={blogs}
                    labelKey="title"
                    valueKey="id"
                    placeholder="Blog Title"
                    value={blogId}
                    disabled
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>Manage Post images</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <Button
                  type="button"
                  overrides={{
                    BaseButton: {
                      style: () => ({
                        width: '100%',
                        borderTopLeftRadius: '3px',
                        borderTopRightRadius: '3px',
                        borderBottomRightRadius: '3px',
                        borderBottomLeftRadius: '3px',
                      }),
                    },
                  }}
                  onClick={openDrawer}
                >
                  Post Images
                </Button>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your post description and necessary information here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl
                    error={
                      shouldNewPostTitleShowError &&
                      validatePostTitle(newPostTitle).errorMessage
                    }
                  >
                    <Input
                      name="post title"
                      value={newPostTitle}
                      onChange={onNewPostTitleChangeHandler}
                      onBlur={onNewPostTitleBlurHandler}
                      positive={validatePostTitle(newPostTitle).isValid}
                      error={shouldNewPostTitleShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Publish Date</FormLabel>
                  <DatePicker
                    selected={publishDate}
                    onChange={(date: Date) => setPublishDate(new Date(date))}
                    dateFormat="MMMM d, yyyy"
                    customInput={<Input />}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Content</FormLabel>

                  <MDEditor
                    value={content}
                    onChange={onMdEditorChangeHandler}
                  />
                  {shouldMdEditorShowError ? (
                    <Error>Content should not be empty</Error>
                  ) : (
                    <Message>Content should not be empty</Message>
                  )}
                </FormFields>

                <FormFields>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl
                    error={
                      shouldNewPageTitleShowError &&
                      validatePageTitle(newPageTitle).errorMessage
                    }
                  >
                    <Input
                      name="page title"
                      value={newPageTitle}
                      onChange={(e) => {
                        onNewPageTitleChangeHandler(e);
                        setSlug(slugify(e.target.value));
                      }}
                      onBlur={onNewPageTitleBlurHandler}
                      positive={validatePageTitle(newPageTitle).isValid}
                      error={shouldNewPageTitleShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>URL Slug</FormLabel>
                  <Input readOnly type="text" name="url slug" value={slug} />
                </FormFields>

                <FormFields>
                  <FormLabel>Keywords/Tags (comma seperated)</FormLabel>
                  <Input
                    value={keywords}
                    onChange={(e: any) => handleKeywordChange(e.target.value)}
                    type="text"
                    name="meta keywords"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                    error={
                      shouldNewDescriptionShowError &&
                      validateDescription(newDescription).errorMessage
                    }
                  >
                    <Input
                      value={newDescription}
                      onChange={onNewDescriptionChangeHandler}
                      onBlur={onNewDescriptionBlurHandler}
                      positive={validateDescription(newDescription).isValid}
                      error={shouldNewDescriptionShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <CustomSelect
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Ex: Active or Pending"
                    value={active}
                    onChange={handleActiveChange}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={onClose}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={!isFormValid}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update Post
          </Button>
        </ButtonGroup>
      </Form>

      {loading && <InLineLoader />}
    </>
  );
};

export default NewPostForm;
