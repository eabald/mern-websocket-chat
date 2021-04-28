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
        </MissingInvitationLinkWrapper>
      </MissingInvitationWrapper>
      <FreepikInfo />
    </MainLayout>
  );
};
export default MissingInvitation;
