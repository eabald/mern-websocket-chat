// React
import React, { ReactNode } from 'react';
// Styled
import { LabelWrapper } from './label.styles';

type LabelProps = {
  children: string | ReactNode;
  htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <LabelWrapper htmlFor={htmlFor}>{children}</LabelWrapper>
);
export default Label;
