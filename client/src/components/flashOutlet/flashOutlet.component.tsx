// React
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { clearAuthError } from '../../redux/auth/auth.actions';
import { unsetFlashMessage } from '../../redux/utils/utils.actions';
import { clearUserError } from '../../redux/user/user.actions';
// Styled
import { FlashOutletWrapper } from './flashOutlet.styles';
// Components
import FlashMessage from '../flashMessage/flashMessage.component';
import { clearPaymentError } from '../../redux/payment/payment.actions';

type FlashOutletProps = {};

const FlashOutlet: React.FC<FlashOutletProps> = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const userError = useSelector((state: RootState) => state.user.error);
  const paymentError = useSelector((state: RootState) => state.payment.error);
  const flashMessages = useSelector((state: RootState) => state.utils.messages);
  return (
    <FlashOutletWrapper>
      {authError ? (
        <FlashMessage
          message={authError.message}
          onClickHandler={() => dispatch(clearAuthError())}
          type='error'
        />
      ) : null}
      {userError ? (
        <FlashMessage
          message={userError.message ?? ''}
          onClickHandler={() => dispatch(clearUserError())}
          type='error'
        />
      ) : null}
      {paymentError ? (
        <FlashMessage
          message={paymentError.message ?? ''}
          onClickHandler={() => dispatch(clearPaymentError())}
          type='error'
        />
      ) : null}
      {flashMessages.map((flash, i) => (
        <FlashMessage
          key={i}
          message={flash.message}
          onClickHandler={() => {
            if (flash.callback && typeof flash.callback === 'function' && flash.additionalData) {
              flash.callback(flash.additionalData);
            }
            dispatch(unsetFlashMessage(flash));
          }}
          onCloseHandler={e => {
            e.stopPropagation();
            dispatch(unsetFlashMessage(flash))
          }}
          type={flash.status}
        />
      ))}
    </FlashOutletWrapper>
  );
};
export default FlashOutlet;
