import React from 'react';
import { LabelWrapper } from './label.styles';

type LabelProps = {
  children: string;
  htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <LabelWrapper htmlFor={htmlFor}>{children}</LabelWrapper>
);
export default Label;
