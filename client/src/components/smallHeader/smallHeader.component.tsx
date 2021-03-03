// React
import React, { ReactNode } from 'react';
// Styled
import { SmallHeaderH1 } from './smallHeader.styles';

type SmallHeaderProps = {
  children: ReactNode | string;
};

const SmallHeader: React.FC<SmallHeaderProps> = ({ children }) => (
  <SmallHeaderH1>{children}</SmallHeaderH1>
);
export default SmallHeader;
