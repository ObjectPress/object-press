import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  let position = window.scrollY;

  useEffect(() => {
    if (pathname || position > 0) {
      window.scrollTo(0, 0);
    }
  }, [pathname, position]);

  return null;
}
