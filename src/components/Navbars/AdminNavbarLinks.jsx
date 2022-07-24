import { Flex } from '@chakra-ui/react';
import SidebarResponsive from '../Sidebar/SidebarResponsive';
import React from 'react';
import { adminRoutes } from '@/routes';

export default function HeaderLinks(props) {
  const { logoText, secondary, ...rest } = props;

  return (
    <Flex
      pe={{ sm: '0px', md: '16px' }}
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
    >
      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        routes={adminRoutes}
        // logo={logo}
        {...rest}
      />
    </Flex>
  );
}
