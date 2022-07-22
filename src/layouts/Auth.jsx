// chakra imports
import { Box, ChakraProvider } from '@chakra-ui/react';
import Footer from '@/components/Footer/Footer';
// core components
import React, { createRef, useEffect, useRef } from 'react';
import routes from '@/routes';
import theme from '@/theme/theme';
import { PublicRoute } from './Route';
import { Redirect, Switch } from 'react-router-dom';

export default function AuthLayout(props) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = createRef();
  useEffect(() => {
    document.body.style.overflow = 'unset';
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getActiveRoute = (routes) => {
    let activeRoute = 'Object Press';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === 'account') {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return (
          <PublicRoute path={prop.path} key={prop.layout + prop.path}>
            <prop.component />
          </PublicRoute>
        );
      } else {
        return null;
      }
    });
  };
  const navRef = useRef();

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Box w="100%">
          <Box ref={wrapper} w="100%" minH="100vh">
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/" />
            </Switch>
          </Box>
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
