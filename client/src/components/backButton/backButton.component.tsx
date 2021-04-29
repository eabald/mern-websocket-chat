// React
import React from 'react';
//  External
import { useHistory } from 'react-router-dom';
// Styled
import { BackButtonElement } from './backButton.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type BackButtonProps = {
  to?: string
};

const BackButton:React.FC<BackButtonProps> = ({ to }) => {
  const history = useHistory();
  return (
    <BackButtonElement onClick={() => to ? history.push(to) : history.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </BackButtonElement>
  )
}
export default BackButton;
