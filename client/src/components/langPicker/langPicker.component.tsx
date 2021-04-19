// React
import React from 'react';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import { LangPickerWrapper, LangPickerFlag } from './langPicker.styles';
import 'flag-icon-css/css/flag-icon.css';

type LangPickerProps = {};

const LangPicker: React.FC<LangPickerProps> = () => {
  const { i18n } = useTranslation();
  return (
    <LangPickerWrapper>
      {Object.keys(i18n.services.resourceStore.data).map((lang) => (
        <LangPickerFlag
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`flag-icon flag-icon-${lang === 'en' ? 'gb' : lang} ${
            lang === i18n.language ? 'active' : ''
          }`}
        ></LangPickerFlag>
      ))}
    </LangPickerWrapper>
  );
};
export default LangPicker;
