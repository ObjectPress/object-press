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
import { useDrawerDispatch } from 'context/DrawerContext';
import { useMutation, useQuery } from '@apollo/client';
import { PROFILE_QUERY } from 'graphql/queries';
import { PROFILE_MUTATION } from 'graphql/mutations';
import useFormControl from '../../hooks/useFormControl';
import {
  validateUsername,
  validateFirstName,
  validateLastName,
  validateWebsite,
} from '../../utils';
import { FormControl } from 'baseui/form-control';

type Props = any;

const ProfileForm: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const history = useHistory();
  const closeDrawer = useCallback(() => {
    dispatch({ type: 'CLOSE_DRAWER' });
    history.replace(`/settings`);
    history.go(0);
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
    if (data?.getUser && !loading) {
      getUserInfo();
    }
  }, [getUserInfo, loading, data]);

  async function onSubmit(event) {
    event.preventDefault();

    await update({
      variables: {
        user: {
          username: newUsername,
          firstName: newFirstName,
          lastName: newLastName,
          company: company,
          title: title,
          country: country,
          website: newWebsite,
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

  ////////////////////////////

  const {
    value: newUsername,
    isValid: newUsernameIsValid,
    onInputChangeHandler: onNewUsernameChangeHandler,
    onInputBlurHandler: onNewUsernameBlurHandler,
    shouldShowError: shouldNewUsernameShowError,
    setInitialValue: setInitialUsername,
  } = useFormControl(validateUsername);
  const {
    value: newFirstName,
    isValid: newFirstNameIsValid,
    onInputChangeHandler: onNewFirstNameChangeHandler,
    onInputBlurHandler: onNewFirstNameBlurHandler,
    shouldShowError: shouldNewFirstNameShowError,
    setInitialValue: setInitialFirstName,
  } = useFormControl(validateFirstName);
  const {
    value: newLastName,
    isValid: newLastNameIsValid,
    onInputChangeHandler: onNewLastNameChangeHandler,
    onInputBlurHandler: onNewLastNameBlurHandler,
    shouldShowError: shouldNewLastNameShowError,
    setInitialValue: setInitialLastName,
  } = useFormControl(validateLastName);
  const {
    value: newWebsite,
    isValid: newWebsiteIsValid,
    onInputChangeHandler: onNewWebsiteChangeHandler,
    onInputBlurHandler: onNewWebsiteBlurHandler,
    shouldShowError: shouldNewWebsiteShowError,
    setInitialValue: setInitialWebsite,
  } = useFormControl(validateWebsite);

  ////////////////////////////

  useEffect(() => {
    setInitialUsername(username);
    setInitialFirstName(firstName);
    setInitialLastName(lastName);
    setInitialWebsite(website);
  }, [
    username,
    firstName,
    lastName,
    website,
    setInitialUsername,
    setInitialFirstName,
    setInitialLastName,
    setInitialWebsite,
  ]);

  const isFormValid: boolean =
    newUsernameIsValid &&
    newFirstNameIsValid &&
    newLastNameIsValid &&
    newWebsiteIsValid;

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
                    <FormControl
                      error={
                        shouldNewUsernameShowError &&
                        validateUsername(newUsername).errorMessage
                      }
                    >
                      <Input
                        required
                        name="username"
                        value={newUsername}
                        onChange={onNewUsernameChangeHandler}
                        onBlur={onNewUsernameBlurHandler}
                        positive={validateUsername(newUsername).isValid}
                        error={shouldNewUsernameShowError}
                      />
                    </FormControl>
                  </FormFields>

                  <FormFields>
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                      error={
                        shouldNewFirstNameShowError &&
                        validateFirstName(newFirstName).errorMessage
                      }
                    >
                      <Input
                        required
                        name="first_name"
                        value={newFirstName}
                        onChange={onNewFirstNameChangeHandler}
                        onBlur={onNewFirstNameBlurHandler}
                        positive={validateFirstName(newFirstName).isValid}
                        error={shouldNewFirstNameShowError}
                      />
                    </FormControl>
                  </FormFields>

                  <FormFields>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                      error={
                        shouldNewLastNameShowError &&
                        validateLastName(newLastName).errorMessage
                      }
                    >
                      <Input
                        required
                        name="last_name"
                        value={newLastName}
                        onChange={onNewLastNameChangeHandler}
                        onBlur={onNewLastNameBlurHandler}
                        positive={validateLastName(newLastName).isValid}
                        error={shouldNewLastNameShowError}
                      />
                    </FormControl>
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
                    <FormControl
                      error={
                        shouldNewWebsiteShowError &&
                        validateWebsite(newWebsite).errorMessage
                      }
                    >
                      <Input
                        name="website"
                        required
                        value={newWebsite}
                        onChange={onNewWebsiteChangeHandler}
                        onBlur={onNewWebsiteBlurHandler}
                        positive={validateWebsite(newWebsite).isValid}
                        error={shouldNewWebsiteShowError}
                      />
                    </FormControl>
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

export default ProfileForm;
