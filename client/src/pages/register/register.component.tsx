// React
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Redux
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/auth/auth.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Validators
import RegisterFormValidationSchema from '../../validators/registerForm.validator';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import { RegisterWrapper } from './register.styles';
// Components
import InlineLink from '../../components/inlineLink/inlineLink.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Checkbox from '../../components/form/checkbox/checkbox.component';
import BackButton from '../../components/backButton/backButton.component';
import TextBlock from '../../components/textBlock/textBlock.component';

type RegisterProps = {};
interface RegisterValues {
  password: string;
  passwordConfirm: string;
  username: string;
  firstName: string;
  lastName: string;
  terms: boolean;
  token: string;
}

const Register: React.FC<RegisterProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSearchParams().get('token');
  const location = useLocation();
  useEffect(() => {
    if (!token) {
      history.push(`/${t('missing-invitation')}`)
    }
  }, [token, history, t, location])
  const submitHandler = async (values: RegisterValues): Promise<void> => {
    await dispatch(signUpStart(values));
  };

  return (
    <MainLayout>
      <BackButton />
      <RegisterWrapper>
        <SmallHeader>{t('Register')}</SmallHeader>
        <Formik
          initialValues={{
            password: '',
            passwordConfirm: '',
            username: '',
            firstName: '',
            lastName: '',
            terms: false,
            token: token ?? '',
          }}
          validationSchema={RegisterFormValidationSchema}
          onSubmit={(
            values: RegisterValues,
            actions: FormikHelpers<RegisterValues>
          ) => {
            submitHandler(values).finally(() => actions.setSubmitting(false));
          }}
        >
          {({ touched, errors, isValid, isSubmitting, values }) => (
            <Form>
              <FormGroup>
                <Label htmlFor='username'>{t('Username')}</Label>
                <FormField
                  id='username'
                  name='username'
                  type='text'
                  placeholder='AwesomePerson'
                  error={touched.username && errors.username}
                />
                <ErrorMessage
                  name='username'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='firstName'>{t('First name')}</Label>
                <FormField
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Awesome'
                  error={touched.firstName && errors.firstName}
                />
                <ErrorMessage
                  name='FirstName'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='lastName'>{t('Last name')}</Label>
                <FormField
                  id='lastName'
                  name='lastName'
                  type='text'
                  placeholder='Person'
                  error={touched.lastName && errors.lastName}
                />
                <ErrorMessage
                  name='lastName'
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
              <FormGroup>
                <Label htmlFor='passwordConfirm'>{t('Confirm password')}</Label>
                <FormField
                  id='passwordConfirm'
                  name='passwordConfirm'
                  type='password'
                  error={touched.passwordConfirm && errors.passwordConfirm}
                />
                <ErrorMessage
                  name='passwordConfirm'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <Checkbox
                name='terms'
                error={touched.terms && errors.terms}
                errorInfo={
                  <ErrorMessage
                    name='terms'
                    render={(error) => (
                      <ValidationError>{error}</ValidationError>
                    )}
                  />
                }
              >
                {t('Accept')}{' '}
                <InlineLink to={`/${t('terms-and-conditions')}`}>
                  {t('terms and conditions')}
                </InlineLink>
              </Checkbox>
              <FormGroup>
                <SubmitButton
                  disabled={!isValid || isSubmitting || !values.terms}
                  loading={isSubmitting}
                  label={t('Register')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
        <TextBlock>
          {t('Have an account? Click')} <InlineLink to={`/${t('login')}`}>{t('here')}</InlineLink> {t('to login.')}
        </TextBlock>
      </RegisterWrapper>
    </MainLayout>
  );
};
export default Register;
