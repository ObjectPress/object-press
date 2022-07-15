import { useMutation } from '@apollo/client';
import { Button, KIND } from 'baseui/button';
import {
  REMOVE_GALLERY_IMAGE_MUTATION,
  REMOVE_IMAGE_MUTATION,
} from 'graphql/mutations';
import React, { useState } from 'react';
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  Image,
  ProductTitle,
  ProductMeta,
  ProductPriceWrapper,
  ProductPrice,
} from './ProductCard.style';

type ProductCardProps = {
  title?: string;
  tag?: string;
  image: string;
  postId?: string;
  galleryId?: string;
  onRemove?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title = '',
  tag = '',
  image,
  postId,
  galleryId,
  onRemove,
  ...props
}) => {
  const [removeGalleryImage] = useMutation(REMOVE_GALLERY_IMAGE_MUTATION);
  const [removePostImage] = useMutation(REMOVE_IMAGE_MUTATION);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  function handleRemove() {
    setShowConfirm(true);
  }

  function copyImage() {
    navigator.clipboard.writeText(image);
  }

  const deleteImage = async () => {
    if (galleryId && !postId)
      await removeGalleryImage({
        variables: {
          image: {
            image: image,
            galleryId: galleryId,
          },
        },
      });

    if (postId && !galleryId)
      await removePostImage({
        variables: {
          image: {
            postId,
            image,
          },
        },
      });

    onRemove();
  };

  return (
    <ProductCardWrapper {...props}>
      <ProductImageWrapper>
        <Image url={image} />
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{title ? `Post Title: '${title}'` : ''}</ProductTitle>
        {!galleryId && (
          <ProductMeta>
            <ProductPriceWrapper>
              <ProductPrice>
                {tag?.length > 0 ? `Alt Tag: '${tag}'` : `Alt Tag: ?`}
              </ProductPrice>
            </ProductPriceWrapper>
          </ProductMeta>
        )}

        {(galleryId || postId) && (
          <ProductMeta>
            <Button
              type="button"
              aria-label="copy button"
              onClick={copyImage}
              overrides={{
                BaseButton: {
                  style: () => ({
                    width: '45%',
                    borderTopLeftRadius: '3px',
                    borderTopRightRadius: '3px',
                    borderBottomRightRadius: '3px',
                    borderBottomLeftRadius: '3px',
                  }),
                },
              }}
            >
              Copy
              <i
                className="far fa-copy fa-lg"
                style={{ marginLeft: '5px' }}
                aria-label="copy button"
              />
            </Button>

            {showConfirm ? (
              <Button
                kind={KIND.minimal}
                onClick={deleteImage}
                type="button"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: '45%',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      borderBottomRightRadius: '3px',
                      borderBottomLeftRadius: '3px',
                      color: $theme.colors.red400,
                    }),
                  },
                }}
              >
                Confirm
                <i
                  className="fas fa-exclamation-triangle"
                  style={{ marginLeft: '5px', color: '#666D92' }}
                />
              </Button>
            ) : (
              <Button
                kind={KIND.minimal}
                onClick={handleRemove}
                type="button"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: '45%',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      borderBottomRightRadius: '3px',
                      borderBottomLeftRadius: '3px',
                      color: $theme.colors.red400,
                    }),
                  },
                }}
              >
                Remove
                <i
                  className="fas fa-trash"
                  style={{ marginLeft: '5px', color: '#666D92' }}
                />
              </Button>
            )}
          </ProductMeta>
        )}
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
