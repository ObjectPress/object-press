import React, { useCallback, useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input';
import Checkbox from 'components/CheckBox/CheckBox';
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
import { useHistory } from 'react-router';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { useMutation, useQuery } from '@apollo/client';
import { PROFILE_QUERY } from 'graphql/queries';
import { PROFILE_MUTATION } from 'graphql/mutations';

type Props = any;

const ProfileForm: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const history = useHistory();
  const closeDrawer = useCallback(() => {
    dispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/settings`);
  }, [dispatch, history]);

  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);
  const { data, loading } = useQuery(PROFILE_QUERY);
  const [update] = useMutation(PROFILE_MUTATION);
  const isOpen = useDrawerState('isOpen');

  async function fetchSettings() {
    const res = data?.getUser;

    setUsername(res.username);
    setFirstName(res.firstName);
    setLastName(res.lastName);
    setCompany(res.company);
    setTitle(res.title);
    setCountry(res.country);
    setWebsite(res.website);
    setChecked(res.notifications);
    setEmail(res.email);
  }

  const getUserInfo = useCallback(fetchSettings, [data]);

  useEffect(() => {
    if ((data?.getUser && !loading) || !isOpen) {
      getUserInfo();
    }
  }, [getUserInfo, loading, data, isOpen]);

  async function onSubmit(event) {
    event.preventDefault();

    await update({
      variables: {
        user: {
          username: username,
          firstName: firstName,
          lastName: lastName,
          company: company,
          title: title,
          country: country,
          website: website,
          notify: checked,
        },
      },
    })
      .then(() => {
        getUserInfo();
      })
      .catch((err) => console.log(err));

    closeDrawer();
  }

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Settings</DrawerTitle>
      </DrawerTitleWrapper>
      {email && (
        <Form
          onSubmit={onSubmit}
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
                <FieldDetails>Update your profile settings here</FieldDetails>
              </Col>

              <Col lg={8}>
                <DrawerBox>
                  <FormFields>
                    <FormLabel>Username</FormLabel>
                    <Input
                      required
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      required
                      name="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      required
                      name="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Country</FormLabel>
                    <Input
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Company</FormLabel>
                    <Input
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Website</FormLabel>
                    <Input
                      name="website"
                      type="url"
                      required
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </FormFields>

                  <FormFields>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      required
                      name="email"
                      value={email}
                      readOnly
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
                      Email Notifications
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
              Close
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
              Update
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </>
  );
};

export default ProfileForm;
