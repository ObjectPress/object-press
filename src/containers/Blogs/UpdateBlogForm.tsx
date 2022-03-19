import React, { useState, useCallback, useEffect } from 'react';
import { useDrawerDispatch } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input';
import Checkbox from 'components/CheckBox/CheckBox';
import { Textarea } from 'components/Textarea/Textarea';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BLOG_QUERY } from 'graphql/queries';
import { UPDATE_BLOG_MUTATION } from 'graphql/mutations';
import useFormControl from '../../hooks/useFormControl';
import {
  validateBlogName,
  validateDescription,
  validateBuildHook,
} from '../../utils/index';
import { FormControl } from 'baseui/form-control';

interface BlogParams {
  id: string;
}

const UpdateBlogForm: React.FC = () => {
  const history = useHistory();
  const drawerDispatch = useDrawerDispatch();

  const { id } = useParams<BlogParams>();
  const [blogName, setBlogName] = useState<string>('');
  const [buildHook, setBuildHook] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);
  const { data } = useQuery(GET_BLOG_QUERY, {
    variables: {
      blog: id,
    },
  });

  const [updateBlog] = useMutation(UPDATE_BLOG_MUTATION);

  function fetchBlog() {
    const blog = data?.getBlog;

    setBlogName(blog.title);
    setBuildHook(blog.hook);
    setDescription(blog.description);
    setChecked(blog.active);
  }

  const getBlogInfo = useCallback(fetchBlog, [data]);

  useEffect(() => {
    if (id && data?.getBlog) {
      getBlogInfo();
    }
  }, [getBlogInfo, id, data]);

  function close() {
    drawerDispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/blogs`);
  }

  const closeDrawer = useCallback(close, [drawerDispatch, history]);

  async function handleSubmit(event) {
    event.preventDefault();

    await updateBlog({
      variables: {
        blog: {
          appId: id,
          title: newBlogName,
          active: checked,
          hook: newBuildHook,
          description: newDescription,
        },
      },
    });

    closeDrawer();
  }

  ////////////////////////////

  const {
    value: newBlogName,
    isValid: newBlogNameIsValid,
    onInputChangeHandler: onNewBlogNameChangeHandler,
    onInputBlurHandler: onNewBlogNameBlurHandler,
    shouldShowError: shouldNewBlogNameShowError,
    setInitialValue: setInitialBlogName,
  } = useFormControl(validateBlogName);
  const {
    value: newBuildHook,
    isValid: newBuildHookIsValid,
    onInputChangeHandler: onNewBuildHookChangeHandler,
    onInputBlurHandler: onNewBuildHookBlurHandler,
    shouldShowError: shouldNewBuildHookShowError,
    setInitialValue: setInitialBuildHook,
  } = useFormControl(validateBuildHook);
  const {
    value: newDescription,
    isValid: newDescriptionIsValid,
    onInputChangeHandler: onNewDescriptionChangeHandler,
    onInputBlurHandler: onNewDescriptionBlurHandler,
    shouldShowError: shouldNewDescriptionShowError,
    setInitialValue: setInitialDescription,
  } = useFormControl(validateDescription);

  ////////////////////////////

  useEffect(() => {
    setInitialBlogName(blogName);
    setInitialBuildHook(buildHook);
    setInitialDescription(description);
  }, [
    blogName,
    buildHook,
    description,
    setInitialBlogName,
    setInitialBuildHook,
    setInitialDescription,
  ]);

  const isFormValid: boolean =
    newBlogNameIsValid && newDescriptionIsValid && newBuildHookIsValid;

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Blog</DrawerTitle>
      </DrawerTitleWrapper>
      {id && (
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
                  Update your blog description and necessary information here
                </FieldDetails>
              </Col>

              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Blog Name</FormLabel>
                    <FormControl
                      error={
                        shouldNewBlogNameShowError &&
                        validateBlogName(newBlogName).errorMessage
                      }
                    >
                      <Input
                        required
                        value={newBlogName}
                        onChange={onNewBlogNameChangeHandler}
                        onBlur={onNewBlogNameBlurHandler}
                        positive={validateBlogName(newBlogName).isValid}
                        error={shouldNewBlogNameShowError}
                      />
                    </FormControl>
                  </FormFields>

                  <FormFields>
                    <FormLabel>Build Hook</FormLabel>
                    <FormControl
                      error={
                        shouldNewBuildHookShowError &&
                        validateBuildHook(newBuildHook).errorMessage
                      }
                    >
                      <Input
                        value={newBuildHook}
                        onChange={onNewBuildHookChangeHandler}
                        onBlur={onNewBuildHookBlurHandler}
                        positive={validateBuildHook(newBuildHook).isValid}
                        error={shouldNewBuildHookShowError}
                      />
                    </FormControl>
                  </FormFields>

                  <FormFields>
                    <FormLabel>Description</FormLabel>
                    <FormControl
                      error={
                        shouldNewDescriptionShowError &&
                        validateDescription(newDescription).errorMessage
                      }
                    >
                      <Textarea
                        required
                        value={newDescription}
                        onChange={onNewDescriptionChangeHandler}
                        onBlur={onNewDescriptionBlurHandler}
                        positive={validateDescription(newDescription).isValid}
                        error={shouldNewDescriptionShowError}
                      />
                    </FormControl>
                  </FormFields>

                  <FormFields>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      name="agreement_check"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => ({
                            color: $theme.colors.textNormal,
                          }),
                        },
                      }}
                    >
                      Active
                    </Checkbox>
                  </FormFields>
                </DrawerBox>
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
              Update
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </>
  );
};

export default UpdateBlogForm;
