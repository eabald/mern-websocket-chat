import React from 'react';
import { ButtonLoaderWrapper, ButtonLoaderDot } from './buttonLoader.styles';

type ButtonLoaderProps = {};

const ButtonLoader:React.FC<ButtonLoaderProps> = () => (
  <ButtonLoaderWrapper>
    <ButtonLoaderDot animationDelay='0s' />
    <ButtonLoaderDot animationDelay='0.1s' />
    <ButtonLoaderDot animationDelay='0.2s' />
  </ButtonLoaderWrapper>
)
export default ButtonLoader;
