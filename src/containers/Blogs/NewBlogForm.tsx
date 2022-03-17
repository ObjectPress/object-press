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
import { Error } from 'components/FormFields/FormFields';
import { useForm, SubmitHandler } from 'react-hook-form';

const NewBlogForm: React.FC = () => {
  const history = useHistory();
  const drawerDispatch = useDrawerDispatch();
  function close() {
    drawerDispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/blogs`);
    history.go(0);
  }

  const closeDrawer = useCallback(close, [drawerDispatch, history]);
  const [blogName, setBlogName] = useState<string>('');
  const [buildHook, setBuildHook] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [checked, setChecked] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  const onHandleSubmit: SubmitHandler<Inputs> = async (data) => {
    //event.preventDefault();

    await dispatch(
      createBlog({
        blog: {
          title: data.blogName,
          active: checked,
          hook: buildHook,
          description: description,
        },
      })
    );

    closeDrawer();
  };

  type Inputs = {
    blogName: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(errors);

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Blog</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit((data) => console.log(data))}
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
                  <Input
                    {...register('blogName', {
                      required: 'blog name is required.',
                    })}
                    value={blogName}
                    onChange={(e) => setBlogName(e.target.value)}
                    required
                  />
                  <Error>{errors.blogName?.message}</Error>
                </FormFields>

                <FormFields>
                  <FormLabel>Build Hook</FormLabel>
                  <Input
                    value={buildHook}
                    onChange={(e) => setBuildHook(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
};

export default NewBlogForm;
