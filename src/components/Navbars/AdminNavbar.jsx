// Chakra Imports
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import AdminNavbarLinks from './AdminNavbarLinks';

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  const {
    variant,
    children,
    fixed,
    secondary,
    brandText,
    onOpen,
    logoText,
    ...rest
  } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  // let mainText = useColorModeValue('gray.700', 'gray.200');
  // let secondaryText = useColorModeValue('gray.400', 'gray.200');
  let navbarPosition = 'absolute';
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(21px)';
  let navbarShadow = 'none';
  let navbarBg = 'none';
  let navbarBorder = 'transparent';
  let secondaryMargin = '0px';
  let paddingX = '15px';
  if (fixed === true)
    if (scrolled === true) {
      navbarPosition = 'fixed';
      navbarShadow = useColorModeValue(
        '0px 7px 23px rgba(0, 0, 0, 0.05)',
        'none'
      );
      navbarBg = useColorModeValue(
        'linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)',
        'linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)'
      );
      navbarBorder = useColorModeValue('#FFFFFF', 'rgba(255, 255, 255, 0.31)');
      navbarFilter = useColorModeValue(
        'none',
        'drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))'
      );
    }
  if (secondary) {
    navbarBackdrop = 'none';
    navbarPosition = 'absolute';
    mainText = 'white';
    secondaryText = 'white';
    secondaryMargin = '22px';
    paddingX = '30px';
  }
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener('scroll', changeNavbar);
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: 'center' }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: 'center' }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      left={''}
      right={'30px'}
      px={{
        sm: paddingX,
        md: '30px',
      }}
      ps={{
        xl: '12px',
      }}
      pt="8px"
      top="18px"
      w={{ sm: 'calc(100vw - 30px)', xl: 'calc(100vw - 75px - 275px)' }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: 'column',
          md: 'row',
        }}
        alignItems={{ xl: 'center' }}
      >
        <Box ms="auto" w={{ sm: '100%', md: 'unset' }}>
          <AdminNavbarLinks
            onOpen={onOpen}
            logoText={logoText}
            secondary={secondary}
            fixed={fixed}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
