import { useCallback, FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from 'baseui';
import { UploadIcon } from 'assets/icons/UploadIcon';

interface Props {
  files: File[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  multiple?: boolean;
  max?: number;
  disabled?: boolean;
}

const Text = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  marginTop: '15px',
  textAlign: 'center',
}));

const TextHighlighted = styled('span', ({ $theme }) => ({
  color: $theme.colors.primary,
  fontWeight: 'bold',
}));

const Container = styled('div', ({ props }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#E6E6E6',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border 0.24s ease-in-out',
  cursor: 'pointer',
}));

const ThumbsContainer = styled('aside', () => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
  width: '100%',
}));

const Thumb = styled('div', ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: 'flex',
  borderRadius: '2px',
  margin: '4px',
  maxWidth: '115px',
  maxHeight: '115px',
  padding: '4px',
  boxSizing: 'border-box',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  transition: $theme.animation.timing200,
  cursor: 'pointer',

  ':hover': {
    '::after': {
      visibility: 'visible',
    },
  },

  '::after': {
    visibility: 'hidden',
    content: `'x'`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '20px',
  },
}));

const ThumbInner = styled('div', ({ $theme, $hovered }) => ({
  display: 'flex',
  transition: $theme.animation.timing200,

  ':hover': {
    filter: 'brightness(0.5)',
  },
}));

const img = {
  display: 'block',
  width: '100px',
  height: 'auto',
};

const Uploader: FC<Props> = ({
  files,
  onUpload,
  onRemove,
  multiple = false,
  max = 5,
  disabled = false,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    disabled,
    accept: 'image/*',
    multiple,
    onDrop: useCallback(
      (acceptedFiles) => {
        if (files.length < max) {
          onUpload(acceptedFiles);
        }
      },
      [onUpload, files, max]
    ),
  });

  return (
    <section className="container uploader">
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <Text>
          <TextHighlighted>Drag/Upload</TextHighlighted> your images here.
        </Text>
      </Container>
      <ThumbsContainer>
        {files.map((file, index) => {
          const url = URL.createObjectURL(file);

          return (
            <Thumb key={index} onClick={() => onRemove(index)}>
              <ThumbInner>
                <img src={url} style={img} alt={file.name} />
              </ThumbInner>
            </Thumb>
          );
        })}
      </ThumbsContainer>
    </section>
  );
};

export default Uploader;
