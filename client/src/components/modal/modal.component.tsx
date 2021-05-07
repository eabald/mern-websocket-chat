// React
import React, { MouseEvent, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
// Styled
import { ModalWrapper, ModalWrapperWindow, ModalWrapperClose, ModalWrapperTitle, ModalWrapperContent } from './modal.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  title: string;
  children?: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const history = useHistory();
  const closeModal = (e: MouseEvent) => {
    e.stopPropagation();
    history.push('/');
  };

  return (
    <ModalWrapper>
      <ModalWrapperWindow>
        <ModalWrapperClose>
          <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
        </ModalWrapperClose>
        <ModalWrapperTitle>
          {title}
        </ModalWrapperTitle>
        <ModalWrapperContent>
          {children}
        </ModalWrapperContent>
      </ModalWrapperWindow>
    </ModalWrapper>
  );
};
export default Modal;
