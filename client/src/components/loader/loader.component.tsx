// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Styled
import { LoaderWrapper, LoaderDotsWrapper, LoaderDot } from './loader.styles';

type LoaderProps = {};

const Loader: React.FC<LoaderProps> = () => {
  const loading = useSelector((state: RootState) => state.flash.loading);
  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <LoaderDotsWrapper>
            <LoaderDot animationDelay='0s' />
            <LoaderDot animationDelay='0.1s' />
            <LoaderDot animationDelay='0.2s' />
          </LoaderDotsWrapper>
        </LoaderWrapper>
      ) : null}
    </>
  );
};
export default Loader;
