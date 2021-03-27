// React
import React from 'react';
// Styled
import { SpinnerWrapper, SpinnerDotsWrapper, SpinnerDot } from './spinner.styles';

type SpinnerProps = {};

const Spinner:React.FC<SpinnerProps> = () => (
  <SpinnerWrapper>
    <SpinnerDotsWrapper>
      <SpinnerDot animationDelay='0s' />
      <SpinnerDot animationDelay='0.1s' />
      <SpinnerDot animationDelay='0.2s' />
    </SpinnerDotsWrapper>
  </SpinnerWrapper>
)
export default Spinner;
