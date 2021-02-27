import React from 'react';
import { SubmitButtonElement } from './submitButton.styles';
import ButtonLoader from '../../buttonLoader/buttonLoader.component';

type SubmitButtonProps = {
  disabled: boolean,
  loading: boolean,
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled, loading}) => (
  <SubmitButtonElement type='submit' disabled={disabled}>{loading ? <ButtonLoader /> : 'Submit'}</SubmitButtonElement>
);
export default SubmitButton;
