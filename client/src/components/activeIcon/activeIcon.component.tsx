// React
import React from 'react';
// Styled
import { ActiveIconWrapper, ActiveIconContent } from './activeIcon.styles'

type ActiveIconProps = {};

const ActiveIcon:React.FC<ActiveIconProps> = () => (
  <ActiveIconWrapper>
    <ActiveIconContent />
  </ActiveIconWrapper>
)
export default ActiveIcon;
