import React from 'react';
import { ErrorsOutletWrapper } from './errorsOutlet.styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import ErrorLayerMessage from '../errorLayerMessage/errorLayerMessage.component';
import { clearAuthError } from '../../redux/auth/auth.actions';

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
