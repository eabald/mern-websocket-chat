import React from 'react';
import { useDispatch } from 'react-redux';
import { signInStart } from '../../redux/auth/auth.actions';
import AuthLayout from '../../layout/auth/auth.layout';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import { LoginWrapper } from './login.styles';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
import LoginFormValidationSchema from '../../validators/loginForm.validator';
import TextBlock from '../../components/textBlock/textBlock.component';
import InlineLink from '../../components/inlineLink/inlineLink.component';

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
          validationSchema={LoginFormValidationSchema}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values);
            setTimeout(() => actions.setSubmitting(false), 500);
          }}
        >
          {({touched, errors, isValid, isSubmitting}) => (
            <Form>
              <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <FormField
                  id='email'
                  name='email'
                  placeholder='awesome@person.com'
                  type='email'
                  error={touched.email && errors.email}
                />
                <ErrorMessage name='email' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <FormField id='password' name='password' type='password' error={touched.password && errors.password} />
                <ErrorMessage name='password' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <SubmitButton disabled={!isValid || isSubmitting} loading={isSubmitting}/>
              </FormGroup>
            </Form>
          )}
        </Formik>
        <TextBlock>If you don't have an account, You can register <InlineLink to='/register'>here</InlineLink></TextBlock>
      </LoginWrapper>
    </AuthLayout>
  );
};
export default Login;
