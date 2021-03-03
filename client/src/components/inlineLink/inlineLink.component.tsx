// React
import React from 'react';
// Styled
import { InlineLinkElement } from './inlineLink.styles';

type InlineLinkProps = {
  to: string,
  children: string,
};

const InlineLink:React.FC<InlineLinkProps> = ({ to, children }) => (
  <InlineLinkElement to={to}>{children}</InlineLinkElement>
)
export default InlineLink;
