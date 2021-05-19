// React
import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import { LangPickerWrapper, LangPickerFlag } from './langPicker.styles';

type LangPickerProps = {};

const LangPicker: React.FC<LangPickerProps> = () => {
  const { i18n } = useTranslation();
  const isOpen = useSelector((state: RootState) => state.utils.mobileMenuOpen);
  return (
    <LangPickerWrapper className={isOpen ? 'is-open' : ''}>
      {Object.keys(i18n.services.resourceStore.data).map((lang) => (
        <LangPickerFlag
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`flag-icon-${lang === 'en' ? 'gb' : lang} ${
            lang === i18n.language ? 'active' : ''
          }`}
        />
      ))}
    </LangPickerWrapper>
  );
};
export default LangPicker;
