// React
import React from 'react';
// Styled
import { LinkButtonWrapper } from './linkButton.styles';

type LinkButtonProps = {
  to: string;
  type: string;
  text?: string;
  children?: React.ReactNode;
};

const LinkButton: React.FC<LinkButtonProps> = ({ to, type, text, children }) => (
  <LinkButtonWrapper to={to} type={type}>
    {text ? text : children}
  </LinkButtonWrapper>
);

export default LinkButton;
