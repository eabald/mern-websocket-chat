// React
import React from 'react';
// External
import { withTranslation } from 'react-i18next';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import {
  ErrorBoundaryWrapper,
  ErrorBoundaryImageWrapper,
  ErrorBoundaryImage,
  ErrorBoundaryTextWrapper,
  ErrorBoundaryInfoWrapper,
} from './errorBoundary.styles';
// Components
import TextBlock from '../textBlock/textBlock.component';
import FreepikInfo from '../freepikInfo/freepikInfo.component';
import SmallHeader from '../smallHeader/smallHeader.component';
import LinkButton from '../linkButton/linkButton.component';

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

interface ErrorBoundaryProps {
  t: (x: string) => string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      return (
        <MainLayout>
          <ErrorBoundaryWrapper>
            <ErrorBoundaryImageWrapper>
              <ErrorBoundaryImage />
            </ErrorBoundaryImageWrapper>
            <ErrorBoundaryTextWrapper>
              <SmallHeader>{t('App Crashed')}</SmallHeader>
            </ErrorBoundaryTextWrapper>
            <ErrorBoundaryInfoWrapper>
              <TextBlock>{t('Something has went horribly wrong.')}</TextBlock>
              <LinkButton to='/' type='block' text={t('Back to homepage')} />
            </ErrorBoundaryInfoWrapper>
          </ErrorBoundaryWrapper>
          <FreepikInfo />
        </MainLayout>
      );
    }

    // If there is no error just render the children component.
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
