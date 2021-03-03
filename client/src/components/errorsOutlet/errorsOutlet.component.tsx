// React
import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { clearAuthError } from '../../redux/auth/auth.actions';
// Styled
import { ErrorsOutletWrapper } from './errorsOutlet.styles';
// Components
import ErrorLayerMessage from '../errorLayerMessage/errorLayerMessage.component';

type ErrorsOutletProps = {};

const ErrorsOutlet: React.FC<ErrorsOutletProps> = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  return (
    <ErrorsOutletWrapper>
      {authError ? <ErrorLayerMessage message={authError.message} onClickHandler={() => dispatch(clearAuthError())} /> : null}
    </ErrorsOutletWrapper>
  );
};
export default ErrorsOutlet;
