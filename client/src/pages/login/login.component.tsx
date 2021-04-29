// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { signInStart } from '../../redux/auth/auth.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Validators
import LoginFormValidationSchema from '../../validators/loginForm.validator';
// Styled
import { LoginWrapper } from './login.styles';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Components
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import InlineLink from '../../components/inlineLink/inlineLink.component';

type LoginProps = {};
interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const submitHandler = async (values: FormValues): Promise<void> => {
    await dispatch(signInStart(values));
  };

  return (
    <MainLayout>
      <LoginWrapper>
        <SmallHeader>{t('Login')}</SmallHeader>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginFormValidationSchema}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values).finally(() => actions.setSubmitting(false));
          }}
        >
          {({ touched, errors, isValid, isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor='username'>{t('Username')}</Label>
                <FormField
                  id='username'
                  name='username'
                  placeholder='awesome-person'
                  type='text'
                  error={touched.username && errors.username}
                />
                <ErrorMessage
                  name='username'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>{t('Password')}</Label>
                <FormField
                  id='password'
                  name='password'
                  type='password'
                  error={touched.password && errors.password}
                />
                <ErrorMessage
                  name='password'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <TextBlock>
                <InlineLink to={`/${t('reset-password')}`}>
                  {t('Forgot your password?')}
                </InlineLink>
              </TextBlock>
              <FormGroup>
                <SubmitButton
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  label={t('Login')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </LoginWrapper>
    </MainLayout>
  );
};
export default Login;
