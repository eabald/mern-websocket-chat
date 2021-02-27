import React from 'react';
import { SubmitButtonElement } from './submitButton.styles';

type SubmitButtonProps = {
  disabled: boolean
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled }) => (
  <SubmitButtonElement type='submit' disabled={disabled}>Submit</SubmitButtonElement>
);
export default SubmitButton;
