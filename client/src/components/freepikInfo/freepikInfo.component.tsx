// React
import React from 'react';
// Styled
import { FreepikInfoWrapper, FreepikInfoLink } from './freepikInfo.styles';

type FreepikInfoProps = {};

const FreepikInfo: React.FC<FreepikInfoProps> = () => (
  <FreepikInfoWrapper>
    Icons made by{' '}
    <FreepikInfoLink
      href='https://www.freepik.com'
      title='Freepik'
      target='_blank'
      rel='noreferrer'
    >
      Freepik{' '}
    </FreepikInfoLink>
    from{' '}
    <FreepikInfoLink
      href='https://www.flaticon.com/'
      title='Flaticon'
      target='_blank'
      rel='noreferrer'
    >
      www.flaticon.com
    </FreepikInfoLink>
  </FreepikInfoWrapper>
);

export default FreepikInfo;
