import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
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
import { CloseDrawer } from 'containers/DrawerItems/DrawerItems';
import { useDispatch } from 'react-redux';
import { fetchGalleries } from 'store/galleries';
import { GalleryList } from 'types';
import { CustomSelect } from 'components/Select/CustomSelect';
import Uploader from 'components/Uploader/Uploader';
import { addNewImage } from 'services/apiServices';
import { InLineLoader } from 'components/InlineLoader/InlineLoader';
import { useMutation } from '@apollo/client';
import { ADD_IMAGE_MUTATION } from 'graphql/mutations';

interface Props {
  onClose: CloseDrawer;
}

const AddGalleryImage: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedGallery, setSelectedGallery] = useState([]);
  const [galleriesFetched, setGalleriesFetched] = useState(false);
  const [galleries, setGalleries] = useState<GalleryList[]>([]);
  const [uploads, setUploads] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [addGalleryImage] = useMutation(ADD_IMAGE_MUTATION);

  async function getGalleries() {
    let galleryList = ((await dispatch(fetchGalleries())) as any)
      .payload as GalleryList[];

    galleryList = galleryList.filter((_) => !_.blog);

    setGalleries(galleryList);
    setGalleriesFetched(true);
  }

  useEffect(() => {
    if (!galleriesFetched && !selectedGallery[0]?.id) {
      getGalleries();
    }
    // eslint-disable-next-line
  }, [galleriesFetched, galleries]);

  const handleSearch = ({ value }) => {
    setSelectedGallery(value);
  };

  const onUpload = (files: File[]) => {
    const file = files[0];

    if (uploads?.length < 5) {
      setUploads([...uploads, file]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      await addGalleryImage({
        variables: {
          gallery: {
            galleryId: selectedGallery[0].id,
            images: imageUrls,
          },
        },
      });

      onClose();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Gallery Image</DrawerTitle>
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
              <FieldDetails>Specifies the Gallery</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Gallery</FormLabel>
                  <CustomSelect
                    options={galleries}
                    labelKey="name"
                    valueKey="id"
                    placeholder="Gallery Name"
                    value={selectedGallery}
                    onChange={handleSearch}
                    searchable={false}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          {selectedGallery[0]?.id && (
            <Row>
              <Col lg={4}>
                <FieldDetails>Add your image here</FieldDetails>
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
            </Row>
          )}
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
            disabled={!uploads[0]}
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

      {loading && <InLineLoader />}
    </>
  );
};

export default AddGalleryImage;
