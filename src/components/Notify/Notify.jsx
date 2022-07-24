// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Stack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Notify({
  title,
  description,
  type,
  isOpen,
  setIsOpen,
}) {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <Stack
          direction="column"
          bottom="0"
          left="0"
          right="0"
          position="fixed"
          mx="auto"
          w={{ sm: '100vw', md: '45vw', xl: '30vw' }}
        >
          {type === 'error' && (
            <Alert borderRadius="8px" status="error" variant="solid">
              <AlertIcon />
              <AlertTitle mr="12px">{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
              <CloseButton
                position="absolute"
                fontSize={{ sm: '8px', md: '12px' }}
                right={{ sm: '8px', md: '8px' }}
                top={{ sm: '8px', md: '8px' }}
                onClick={() => setIsOpen(false)}
              />
            </Alert>
          )}
          {type === 'warning' && (
            <Alert borderRadius="8px" status="warning" variant="solid">
              <AlertIcon />
              <AlertTitle mr="12px">{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
              <CloseButton
                position="absolute"
                fontSize={{ sm: '8px', md: '12px' }}
                right={{ sm: '8px', md: '8px' }}
                top={{ sm: '8px', md: '8px' }}
                onClick={() => setIsOpen(false)}
              />
            </Alert>
          )}
          {type === 'info' && (
            <Alert borderRadius="8px" status="info" variant="solid">
              <AlertIcon />
              <AlertTitle mr="12px">{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
              <CloseButton
                position="absolute"
                fontSize={{ sm: '8px', md: '12px' }}
                right={{ sm: '8px', md: '8px' }}
                top={{ sm: '8px', md: '8px' }}
                onClick={() => setIsOpen(false)}
              />
            </Alert>
          )}
          {type === 'success' && (
            <Alert borderRadius="8px" status="success" variant="solid">
              <AlertIcon />
              <AlertTitle mr="12px">{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
              <CloseButton
                position="absolute"
                fontSize={{ sm: '8px', md: '12px' }}
                right={{ sm: '8px', md: '8px' }}
                top={{ sm: '8px', md: '8px' }}
                onClick={() => setIsOpen(false)}
              />
            </Alert>
          )}
        </Stack>
      )}
    </>
  );
}
