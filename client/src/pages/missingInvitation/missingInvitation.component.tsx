// React
import React from 'react';
// External
import { useTranslation } from 'react-i18next';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import {
  MissingInvitationWrapper,
  MissingInvitationImageWrapper,
  MissingInvitationImage,
  MissingInvitationTextWrapper,
  MissingInvitationLinkWrapper,
} from './missingInvitation.styles';
// Components
import FreepikInfo from '../../components/freepikInfo/freepikInfo.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import BackButton from '../../components/backButton/backButton.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import LinkButton from '../../components/linkButton/linkButton.component';

type MissingInvitationProps = {};

const MissingInvitation: React.FC<MissingInvitationProps> = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <BackButton to='/' />
      <MissingInvitationWrapper>
        <MissingInvitationImageWrapper>
          <MissingInvitationImage />
        </MissingInvitationImageWrapper>
        <MissingInvitationTextWrapper>
          <SmallHeader>{t('Shame')}</SmallHeader>
        </MissingInvitationTextWrapper>
        <MissingInvitationLinkWrapper>
          <TextBlock>{t('Looks like you are missing your invitation. Unfortunately you need one to register.')}</TextBlock>
          <TextBlock>{t('Buy invitation info')}</TextBlock>
          <LinkButton to={`/${t('buy-registration')}`} type='block'>
            <FontAwesomeIcon icon={faDollarSign} />{' '}
            {t('Buy for label', { price: '4.99' })}
          </LinkButton>
        </MissingInvitationLinkWrapper>
      </MissingInvitationWrapper>
      <FreepikInfo />
    </MainLayout>
  );
};
export default MissingInvitation;
