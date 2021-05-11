// React
import React from 'react';
// External
import { useTranslation } from 'react-i18next';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import {
  NotFoundWrapper,
  NotFoundImageWrapper,
  NotFoundImage,
  NotFoundTextWrapper,
  NotFoundInfoWrapper,
} from './notFound.styles';
// Components
import TextBlock from '../../components/textBlock/textBlock.component';
import FreepikInfo from '../../components/freepikInfo/freepikInfo.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import LinkButton from '../../components/linkButton/linkButton.component';

type NotFoundProps = {};

const NotFound:React.FC<NotFoundProps> = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <NotFoundWrapper>
        <NotFoundImageWrapper>
          <NotFoundImage />
        </NotFoundImageWrapper>
        <NotFoundTextWrapper>
          <SmallHeader>{t('Not found')}</SmallHeader>
        </NotFoundTextWrapper>
        <NotFoundInfoWrapper>
          <TextBlock>{t('The page you are looking for was not found.')}</TextBlock>
          <LinkButton to='/' type='block' text={t('Back to homepage')} />
        </NotFoundInfoWrapper>
      </NotFoundWrapper>
      <FreepikInfo />
    </MainLayout>
  );
}
export default NotFound;
