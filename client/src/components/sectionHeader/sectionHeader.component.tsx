import React, { ReactNode } from 'react';
import { SectionHeaderH3 } from './sectionHeader.styles';

type SectionHeaderProps = {
  children: ReactNode | string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => (
  <SectionHeaderH3>{children}</SectionHeaderH3>
);
export default SectionHeader;
