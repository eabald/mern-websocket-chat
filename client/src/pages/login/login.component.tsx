import React from 'react';
import { useDispatch } from 'react-redux';
import { signInStart } from '../../redux/auth/auth.actions';

import AuthLayout from '../../layout/auth/auth.layout';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import { LoginWrapper } from './login.styles';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import { Formik, FormikHelpers, Form } from 'formik';

type LoginProps = {};
interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const submitHandler = async (values: FormValues): Promise<void> => {
    await dispatch(signInStart(values));
  };

  return (
    <AuthLayout>
      <LoginWrapper>
        <SmallHeader>Login</SmallHeader>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values);
          }}
        >
          <Form>
            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <FormField
                id='email'
                name='email'
                placeholder='awesome@person.com'
                type='email'
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <FormField id='password' name='password' type='password' />
            </FormGroup>
            <FormGroup>
              <SubmitButton />
            </FormGroup>
          </Form>
        </Formik>
      </LoginWrapper>
    </AuthLayout>
  );
};
export default Login;
