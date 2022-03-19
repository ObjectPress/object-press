import React, { useState, useCallback } from 'react';
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
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createBlog } from 'store/blogs';
import { FormControl } from 'baseui/form-control';
import useFormControl from '../../hooks/useFormControl';
import {
  validateBlogName,
  validateDescription,
  validateBuildHook,
} from '../../utils/index';

export default function NewBlogForm() {
  const history = useHistory();
  const drawerDispatch = useDrawerDispatch();
  function close() {
    drawerDispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/blogs`);
    history.go(0);
  }

  const closeDrawer = useCallback(close, [drawerDispatch, history]);
  //const [blogName, setBlogName] = useState<string>('');
  //const [buildHook, setBuildHook] = useState<string>('');
  //const [description, setDescription] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    await dispatch(
      createBlog({
        blog: {
          title: blogName,
          active: checked,
          hook: buildHook,
          description: description,
        },
      })
    );

    closeDrawer();
  }

  //////////////////////////

  const {
    value: blogName,
    isValid: blogNameIsValid,
    onInputChangeHandler: onBlogNameChangeHandler,
    onInputBlurHandler: onBlogNameBlurHandler,
    shouldShowError: shouldBlogNameShowError,
  } = useFormControl(validateBlogName);
  const {
    value: buildHook,
    isValid: buildHookIsValid,
    onInputChangeHandler: onBuildHookChangeHandler,
    onInputBlurHandler: onBuildHookBlurHandler,
    shouldShowError: shouldBuildHookShowError,
  } = useFormControl(validateBuildHook);
  const {
    value: description,
    isValid: descriptionIsValid,
    onInputChangeHandler: onDescriptionChangeHandler,
    onInputBlurHandler: onDescriptionBlurHandler,
    shouldShowError: shouldDescriptionShowError,
  } = useFormControl(validateDescription);

  //////////////////////////

  const isFormValid: boolean =
    blogNameIsValid && descriptionIsValid && buildHookIsValid;

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Blog</DrawerTitle>
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
                Add your blog description and necessary information here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Blog Name</FormLabel>
                  <FormControl
                    error={
                      shouldBlogNameShowError &&
                      validateBlogName(blogName).errorMessage
                    }
                  >
                    <Input
                      value={blogName}
                      onChange={onBlogNameChangeHandler}
                      onBlur={onBlogNameBlurHandler}
                      positive={validateBlogName(blogName).isValid}
                      error={shouldBlogNameShowError}
                      required
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Build Hook</FormLabel>
                  <FormControl
                    error={
                      shouldBuildHookShowError &&
                      validateBuildHook(buildHook).errorMessage
                    }
                  >
                    <Input
                      value={buildHook}
                      onChange={onBuildHookChangeHandler}
                      onBlur={onBuildHookBlurHandler}
                      positive={validateBuildHook(buildHook).isValid}
                      error={shouldBuildHookShowError}
                      required
                    />
                  </FormControl>
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <FormControl
                    error={
                      shouldDescriptionShowError &&
                      validateDescription(description).errorMessage
                    }
                  >
                    <Textarea
                      value={description}
                      onChange={onDescriptionChangeHandler}
                      onBlur={onDescriptionBlurHandler}
                      positive={validateDescription(description).isValid}
                      error={shouldDescriptionShowError}
                      required
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
            Add
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}
