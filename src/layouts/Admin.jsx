import { useState } from 'react';
// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Configurator from '@/components/Configurator/Configurator';
import Footer from '@/components/Footer/Footer';
// Layout components
import AdminNavbar from '@/components/Navbars/AdminNavbar';
import Sidebar from '@/components/Sidebar';
import { Redirect, Switch } from 'react-router-dom';
import routes from '@/routes';
// Custom Chakra theme
import theme from '@/theme/theme';
import FixedPlugin from '@/components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '@/components/Layout/MainPanel';
import PanelContainer from '@/components/Layout/PanelContainer';
import PanelContent from '@/components/Layout/PanelContent';
import { PrivateRoute } from './Route';

export default function AdminLayout(props) {
  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
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
  // This changes navbar state(fixed or not)
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
      if (prop.layout === '/admin' || prop.layout === '/inner') {
        return (
          <PrivateRoute path={prop.path} key={prop.layout + prop.path}>
            <prop.component />
          </PrivateRoute>
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={'Object Press'}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        w={{
          base: '100%',
          xl: 'calc(100% - 275px)',
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={'Object Press'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent minH="100vh">
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <FixedPlugin
          secondary={getActiveNavbar(routes)}
          fixed={fixed}
          onOpen={onOpen}
        />
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onRoutes={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant('opaque')}
          onTransparent={() => setSidebarVariant('transparent')}
        />
      </MainPanel>
    </ChakraProvider>
  );
}
