// React
import React from 'react';
// Styled
import { LinkButtonWrapper } from './linkButton.styles';

type LinkButtonProps = {
  to: string;
  type: string;
  text: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({ to, type, text }) => (
  <LinkButtonWrapper to={to} type={type}>
    {text}
  </LinkButtonWrapper>
);

export default LinkButton;
