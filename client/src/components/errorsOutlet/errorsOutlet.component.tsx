// React
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { clearAuthError } from '../../redux/auth/auth.actions';
import { unsetFlashMessage } from '../../redux/utils/utils.actions';
// Styled
import { ErrorsOutletWrapper } from './errorsOutlet.styles';
// Components
import ErrorLayerMessage from '../errorLayerMessage/errorLayerMessage.component';

type ErrorsOutletProps = {};

const ErrorsOutlet: React.FC<ErrorsOutletProps> = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const userError = useSelector((state: RootState) => state.user.error);
  const flashMessages = useSelector((state: RootState) => state.utils.messages);
  return (
    <ErrorsOutletWrapper>
      {authError ? (
        <ErrorLayerMessage
          message={authError.message}
          onClickHandler={() => dispatch(clearAuthError())}
        />
      ) : null}
      {userError ? (
        <ErrorLayerMessage
          message={userError.message ?? ''}
          onClickHandler={() => dispatch(clearAuthError())}
        />
      ) : null}
      {flashMessages.map((flash, i) => (
        <ErrorLayerMessage
          key={i}
          message={flash.message}
          onClickHandler={() => dispatch(unsetFlashMessage(flash))}
        />
      ))}
    </ErrorsOutletWrapper>
  );
};
export default ErrorsOutlet;
