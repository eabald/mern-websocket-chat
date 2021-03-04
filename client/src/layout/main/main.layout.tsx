// React
import React, { FC, ReactNode } from 'react';
// Styled
import { MainLayoutWrapper, MainLayoutBox } from './main.styles.layout';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <MainLayoutWrapper>
    <MainLayoutBox>{children}</MainLayoutBox>
  </MainLayoutWrapper>
);
export default MainLayout;
