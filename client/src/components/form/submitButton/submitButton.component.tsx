// React
import React from 'react';
// Styled
import { SubmitButtonElement } from './submitButton.styles';
// Components
import ButtonLoader from '../../buttonLoader/buttonLoader.component';

type SubmitButtonProps = {
  disabled: boolean,
  loading: boolean,
  label: string,
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, loading, label }) => (
  <SubmitButtonElement type='submit' disabled={disabled}>{loading ? <ButtonLoader /> : label}</SubmitButtonElement>
);
export default SubmitButton;
