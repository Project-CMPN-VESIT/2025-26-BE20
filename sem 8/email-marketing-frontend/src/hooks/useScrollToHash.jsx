import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
};

export default useScrollToHash;
