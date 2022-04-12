import React from 'react';
import NoResultSvg from './no-result.svg';
import { NoResultWrapper, ImageWrapper, ButtonWrapper } from './NoResult.style';
import Button from '../Button/Button';
// import { ArrowPrev } from '../AllSvgIcon';

type NoResultProps = {
  id?: string;
  onClick?: () => void;
  hideButton?: boolean;
  style?: any;
};

const NoResult: React.FC<NoResultProps> = ({
  id,
  onClick,
  hideButton = true,
  style,
}) => {
  return (
    <NoResultWrapper id={id} style={style}>
      <b>sorry, no results found :(</b>

      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      {hideButton ? (
        <ButtonWrapper>
          <div onClick={onClick}>
            <Button>
              Try Again Later
              {/* <ArrowPrev /> Go Back */}
            </Button>
          </div>
        </ButtonWrapper>
      ) : null}
    </NoResultWrapper>
  );
};

export default NoResult;
