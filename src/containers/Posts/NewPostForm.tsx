import React, { useState, useCallback, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from 'context/DrawerContext';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import {
  FormFields,
  FormLabel,
  Error,
  Message,
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
import {
  addPost,
  clearNewPost,
  savedNewPostSelector,
  setNewPost,
} from 'store/posts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFormControl from '../../hooks/useFormControl';
import {
  validatePostTitle,
  validatePageTitle,
  validateDescription,
} from '../../utils';
import { FormControl } from 'baseui/form-control';
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
import { CustomSelect } from 'components/Select/CustomSelect';
import { NewPost } from 'types';

interface Props {
  onClose: CloseDrawer;
}

const options = [
  { value: true, name: 'Active' },
  { value: false, name: 'Pending' },
];

const NewPostForm: React.FC<Props> = ({ onClose }) => {
  const drawerDispatch = useDrawerDispatch();
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isMdEditorVisited, setIsMdEditorVisited] = useState<boolean>(false);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [publishAt, setPublishAt] = useState(new Date());
  const [blogsFetched, setBlogsFetched] = useState(false);

  const dispatch = useDispatch();

  const blogs = useSelector(blogsSelector());
  const savedFormData = useSelector(savedNewPostSelector());

  const getFormValue = (): NewPost => ({
    appId: blogId[0]?.id || '',
    post: {
      title: postTitle,
      publishAt: publishAt.toISOString(),
      content,
      pageTitle,
      slug: slugify(pageTitle),
      keywords,
      description: description,
      images: savedFormData.post.images,
      altTags: savedFormData.post.altTags,
    },
    active: active[0]?.value || '',
  });

  const setFormValue = (form: NewPost) => {
    setBlogId(
      form.appId.length ? [blogs.find(({ id }) => id === form.appId)] : []
    );
    setActive(
      form.active
        ? [options.find((option) => option.value === form.active)]
        : []
    );
    setPostTitle(form.post.title);
    setPublishAt(
      form.post.publishAt.length ? new Date(form.post.publishAt) : new Date()
    );
    setContent(form.post.content);
    setPageTitle(form.post.pageTitle);
    setSlug(form.post.slug);
    setKeywords(form.post.keywords);
    setDescription(form.post.description);
  };

  const openDrawer = useCallback(() => {
    dispatch(setNewPost(getFormValue()));
    drawerDispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'MANAGE_IMAGES',
      backUrl: '/new-post',
      newUrl: '/manage-post-images/new',
    });
    // eslint-disable-next-line
  }, [drawerDispatch, getFormValue]);

  useEffect(() => {
    const formData = savedFormData;

    setFormValue(formData);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, blogsFetched]);

  const {
    value: postTitle,
    isValid: postTitleIsValid,
    onInputChangeHandler: onPostTitleChangeHandler,
    onInputBlurHandler: onPostTitleBlurHandler,
    shouldShowError: shouldPostTitleShowError,
    setValue: setPostTitle,
  } = useFormControl(validatePostTitle);
  const {
    value: pageTitle,
    isValid: pageTitleIsValid,
    onInputChangeHandler: onPageTitleChangeHandler,
    onInputBlurHandler: onPageTitleBlurHandler,
    shouldShowError: shouldPageTitleShowError,
    setValue: setPageTitle,
  } = useFormControl(validatePageTitle);
  const {
    value: description,
    isValid: descriptionIsValid,
    onInputChangeHandler: onDescriptionChangeHandler,
    onInputBlurHandler: onDescriptionBlurHandler,
    shouldShowError: shouldDescriptionShowError,
    setValue: setDescription,
  } = useFormControl(validateDescription);

  const isMdEditorValid = content.length > 0;
  const shouldMdEditorShowError = isMdEditorVisited && !isMdEditorValid;

  const isFormValid: boolean =
    postTitleIsValid &&
    pageTitleIsValid &&
    isMdEditorValid &&
    descriptionIsValid &&
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
          addPost({
            post: getFormValue(),
          })
        );

        dispatch(clearNewPost());
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

  const handleBlogChange = ({ value }) => {
    setBlogId(value);
  };

  const handleKeywordChange = (value: string) => {
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
        <DrawerTitle>Add Post</DrawerTitle>
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
              <FieldDetails>Specify the Blog this Post belongs to</FieldDetails>
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
                    onChange={handleBlogChange}
                    searchable={false}
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
                      shouldPostTitleShowError &&
                      validatePostTitle(postTitle).errorMessage
                    }
                  >
                    <Input
                      name="post title"
                      value={postTitle}
                      onChange={onPostTitleChangeHandler}
                      onBlur={onPostTitleBlurHandler}
                      positive={validatePostTitle(postTitle).isValid}
                      error={shouldPostTitleShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Publish Date</FormLabel>
                  <DatePicker
                    selected={publishAt}
                    onChange={(date: Date) => setPublishAt(new Date(date))}
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
                  {shouldMdEditorShowError && isMdEditorVisited && (
                    <Error>Content should not be empty</Error>
                  )}

                  {!isMdEditorVisited && (
                    <Message>Content should not be empty</Message>
                  )}
                </FormFields>

                <FormFields>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl
                    error={
                      shouldPageTitleShowError &&
                      validatePageTitle(pageTitle).errorMessage
                    }
                  >
                    <Input
                      name="page title"
                      value={pageTitle}
                      onChange={(e) => {
                        onPageTitleChangeHandler(e);
                        setSlug(slugify(e.target.value));
                      }}
                      onBlur={onPageTitleBlurHandler}
                      positive={validatePageTitle(pageTitle).isValid}
                      error={shouldPageTitleShowError}
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
                      shouldDescriptionShowError &&
                      validateDescription(description).errorMessage
                    }
                  >
                    <Input
                      value={description}
                      onChange={onDescriptionChangeHandler}
                      onBlur={onDescriptionBlurHandler}
                      positive={validateDescription(description).isValid}
                      error={shouldDescriptionShowError}
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <CustomSelect
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Active or Pending"
                    value={active}
                    onChange={handleActiveChange}
                    status={active}
                    searchable={false}
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
            Add Post
          </Button>
        </ButtonGroup>
      </Form>

      {loading && <InLineLoader />}
    </>
  );
};

export default NewPostForm;
