// React
import { useLocation } from 'react-router';

const useSearchParams = () => {
  return new URLSearchParams(useLocation().search);
};

export default useSearchParams;
