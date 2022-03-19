import React, { useCallback, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input';
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
import { useEffect } from 'react';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext';
import { useQuery } from '@apollo/client';
import { CREDS_QUERY } from 'graphql/queries';

type Props = any;

const CredsForm: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => {
    dispatch({ type: 'CLOSE_DRAWER' });
  }, [dispatch]);
  const [userSecret, setUserSecret] = useState<string>('');
  const [appSecret, setAppSecret] = useState<string[]>([]);
  const [blogTitles, setBlogTitles] = useState<string[]>([]);
  const isOpen = useDrawerState('isOpen');

  const { data, loading } = useQuery(CREDS_QUERY);

  async function fetchCreds() {
    const response = data?.getAllBlogs.map((cred) => cred);

    setUserSecret(response[0].userSecret);
    setAppSecret(response.map((res) => res.appSecret));
    setBlogTitles(response.map((res) => res.title));
  }

  const getUserCreds = useCallback(fetchCreds, [data]);

  useEffect(() => {
    if ((data?.getAllBlogs[0] && !loading) || !isOpen) {
      getUserCreds();
    }
  }, [getUserCreds, loading, data, isOpen]);

  function copy(secret) {
    navigator.clipboard.writeText(secret);
  }

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>View Credentials</DrawerTitle>
      </DrawerTitleWrapper>
      <Form style={{ height: '100%', backgroundColor: '#f7f7f7' }}>
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
              <FieldDetails>View your blog credentials here</FieldDetails>
            </Col>

            <Col lg={8}>
              {userSecret?.length > 0 ? (
                <DrawerBox>
                  <FormFields>
                    <FormFields>
                      <FormLabel>
                        <i
                          className="far fa-copy fa-lg"
                          style={{ cursor: 'pointer', marginRight: 10 }}
                          aria-label="copy button"
                          onClick={() => copy(userSecret)}
                        />
                        User Secret
                      </FormLabel>
                      <Input
                        name="User Secret"
                        type="password"
                        value={userSecret}
                        readOnly
                      />
                    </FormFields>
                  </FormFields>
                  {blogTitles[0]?.length &&
                    blogTitles.map((title, index) => (
                      <FormFields key={appSecret[index]}>
                        <FormFields>
                          <FormLabel>
                            <i
                              className="far fa-copy fa-lg"
                              style={{ cursor: 'pointer', marginRight: 10 }}
                              aria-label="copy button"
                              onClick={() => copy(appSecret[index])}
                            />
                            App Secret: {title}
                          </FormLabel>
                          <Input
                            name={title}
                            type="password"
                            value={appSecret[index]}
                            readOnly
                          />
                        </FormFields>
                      </FormFields>
                    ))}
                </DrawerBox>
              ) : (
                <FormFields>
                  <FormFields>
                    <FormLabel>User Secret</FormLabel>
                    <Input
                      name="No Secret"
                      value="You currently have no blogs."
                      readOnly
                    />
                  </FormFields>
                </FormFields>
              )}
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
        </ButtonGroup>
      </Form>
    </>
  );
};

export default CredsForm;
