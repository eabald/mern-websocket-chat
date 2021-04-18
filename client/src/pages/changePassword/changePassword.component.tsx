// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Validators
import ChangePasswordValidationSchema from '../../validators/changePassword.validator';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Styled
import { ChangePasswordWrapper } from './changePassword.styles';
import { changePasswordStart } from '../../redux/auth/auth.actions';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Components
import InlineLink from '../../components/inlineLink/inlineLink.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import BackButton from '../../components/backButton/backButton.component';
import TextBlock from '../../components/textBlock/textBlock.component';

type ChangePasswordProps = {};
interface ChangePasswordValues {
  password: string;
  passwordConfirm: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const { t } =useTranslation();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const submitHandler = async (values: ChangePasswordValues): Promise<void> => {
    await dispatch(changePasswordStart({...values, token: params.get('token') ?? '' }));
  }

  return (
    <MainLayout>
      <BackButton />
      <ChangePasswordWrapper>
        <SmallHeader>{t('Change password')}</SmallHeader>
        <Formik
          initialValues={{
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={ChangePasswordValidationSchema}
          onSubmit={(
            values: ChangePasswordValues,
            actions: FormikHelpers<ChangePasswordValues>
          ) => {
            submitHandler(values).finally(() => actions.setSubmitting(false));
          }}
        >
          {({ touched, errors, isValid, isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor='password'>{t('New password')}</Label>
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
              <FormGroup>
                <SubmitButton
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  label={t('Change')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
        <TextBlock>
          {t('Want to login instead? Click')} <InlineLink to='/login'>{t('here')}</InlineLink>{' '}
          {t('to login.')}
        </TextBlock>
      </ChangePasswordWrapper>
    </MainLayout>
  );
};
export default ChangePassword;
