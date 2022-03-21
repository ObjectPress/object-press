import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from 'context/DrawerContext';
import Uploader from 'components/Uploader/Uploader';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
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
import { addNewImage } from 'services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { blogsSelector, fetchBlogs } from 'store/blogs';
import { addPost } from 'store/posts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Error } from '../../components/FormFields/FormFields';

const options = [
  { value: true, name: 'Active' },
  { value: false, name: 'Pending' },
];

const CustomSelect: React.FC<any> = (props) => {
  return (
    <Select
      {...props}
      overrides={{
        Placeholder: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        DropdownListItem: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        OptionContent: {
          style: ({ $theme, $selected }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $selected
                ? $theme.colors.textDark
                : $theme.colors.textNormal,
            };
          },
        },
        SingleValue: {
          style: ({ $theme }) => {
            return {
              ...$theme.typography.fontBold14,
              color: $theme.colors.textNormal,
            };
          },
        },
        Popover: {
          props: {
            overrides: {
              Body: {
                style: { zIndex: 5 },
              },
            },
          },
        },
      }}
    />
  );
};

const NewPostForm: React.FC = () => {
  const drawerDispatch = useDrawerDispatch();
  const history = useHistory();
  function close() {
    drawerDispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/posts`);
  }

  const closeDrawer = useCallback(close, [drawerDispatch, history]);
  const [title, setTitle] = useState<string>('');
  const [pageTitle, setPageTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isMdEditorVisited, setIsMdEditorVisited] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [active, setActive] = useState([]);
  const [uploads, setUploads] = useState<File[]>([]);
  const [altTags, setAltTags] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [publishAt, setPublishAt] = useState(new Date());

  const dispatch = useDispatch();

  const blogs = useSelector(blogsSelector());
  const [blogsFetched, setBlogsFetched] = useState(false);

  useEffect(() => {
    if (!blogs?.length && !blogsFetched) {
      setBlogsFetched(true);
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs, blogsFetched]);

  function onTagChange(value, index: number) {
    if (altTags?.length) {
      const newTags = [...altTags];

      newTags[index] = value;

      setAltTags(newTags);
    } else {
      setAltTags(value);
    }
  }

  const tags = () => {
    return uploads[0] ? (
      uploads?.map((upload, index) => {
        return (
          <FormFields key={index}>
            <FormLabel>Image Alt Tag {index + 1}</FormLabel>
            <Input
              type="text"
              name={`tag${index + 1}`}
              onChange={(e) => onTagChange(e.target.value, index)}
            />
          </FormFields>
        );
      })
    ) : (
      <FormFields>
        <FormLabel>Image Alt Tags</FormLabel>
        <Input
          type="text"
          name="image alt tags"
          value="You haven't uploaded any images."
          readOnly
        />
      </FormFields>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isMdEditorValid) {
      setIsMdEditorVisited(true);
      return;
    }

    setLoading(true);

    const imageUrls: string[] = [];
    const stamp = Date.now();

    try {
      for (const file of uploads) {
        const formData = new FormData();
        let name = `${stamp}/${file.name}`;

        formData.append(name, file);

        // Send this form data to a Rest API
        await addNewImage(formData);

        let path = `https://share.objectpress.io/${name}`;
        imageUrls.push(path);
      }

      await dispatch(
        addPost({
          post: {
            appId: blogId[0].id,
            post: {
              title,
              publishAt: publishAt.toISOString(),
              content,
              pageTitle,
              slug: slugify(pageTitle),
              keywords,
              description,
              images: imageUrls?.length ? imageUrls : [''],
              altTags,
            },
            active: active[0].value,
          },
        })
      );

      closeDrawer();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const onUpload = (files: File[]) => {
    const file = files[0];

    if (uploads?.length < 5) {
      setUploads([...uploads, file]);
    }
  };

  const handleActiveChange = ({ value }) => {
    setActive(value);
  };

  const handleBlogChange = ({ value }) => {
    console.log(value);
    setBlogId(value);
  };

  const handleKeywordChange = (value: string) => {
    setKeywords(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const onMdEditorChangeHandler = (value: string) => {
    if (!isMdEditorVisited) {
      setIsMdEditorVisited(true);
    }

    setContent(value!);
  };

  const isMdEditorValid = content.length > 0;
  const shouldMdEditorShowError = isMdEditorVisited && !isMdEditorValid;

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
                    required
                    options={blogs}
                    labelKey="title"
                    valueKey="id"
                    placeholder="Blog Title"
                    value={blogId}
                    onChange={handleBlogChange}
                  />
                </FormFields>
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
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLegnth={25}
                    name="name"
                  />
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
                  {shouldMdEditorShowError && (
                    <Error>Content should not be empty.</Error>
                  )}
                </FormFields>

                <FormFields>
                  <FormLabel>Page Title</FormLabel>
                  <Input
                    required
                    type="text"
                    name="page title"
                    value={pageTitle}
                    onChange={(e) => {
                      setPageTitle(e.target.value);
                      setSlug(slugify(e.target.value));
                    }}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>URL Slug</FormLabel>
                  <Input
                    readOnly
                    required
                    type="text"
                    name="url slug"
                    value={slug}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Meta Keywords (comma seperated)</FormLabel>
                  <Input
                    value={keywords}
                    onChange={(e: any) => handleKeywordChange(e.target.value)}
                    type="text"
                    name="meta keywords"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Meta Description</FormLabel>
                  <Input
                    value={description}
                    onChange={(e: any) =>
                      handleDescriptionChange(e.target.value)
                    }
                    type="text"
                    name="meta description"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Status</FormLabel>
                  <CustomSelect
                    required
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Active or Pending"
                    value={active}
                    onChange={handleActiveChange}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your post images here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
                    },
                  },
                }}
              >
                <Uploader onChange={onUpload} />
              </DrawerBox>
            </Col>

            <Col lg={4}>
              <FieldDetails>Add your image alt tags here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>{tags()}</DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
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
