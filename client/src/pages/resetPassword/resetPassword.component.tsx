// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { resetPasswordStart } from '../../redux/auth/auth.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// Validators
import ResetPasswordValidationSchema from '../../validators/resetPassword.validator';
// Styled
import { ResetPasswordWrapper } from './resetPassword.styles';
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

type ResetPasswordProps = {};
interface ResetPasswordValues {
  email: string;
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
  const dispatch = useDispatch();
  const submitHandler = async (values: ResetPasswordValues): Promise<void> => {
    await dispatch(resetPasswordStart(values));
  };

  return (
    <MainLayout>
      <BackButton />
      <ResetPasswordWrapper>
        <SmallHeader>Reset password</SmallHeader>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordValidationSchema}
          onSubmit={(
            values: ResetPasswordValues,
            actions: FormikHelpers<ResetPasswordValues>
          ) => {
            submitHandler(values).finally(() => actions.setSubmitting(false));
          }}
        >
          {({ touched, errors, isValid, isSubmitting }) => (
            <Form>
              <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <FormField
                  id='email'
                  name='email'
                  type='email'
                  placeholder='awesome@person.com'
                  error={touched.email && errors.email}
                />
                <ErrorMessage
                  name='email'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <SubmitButton
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
        <TextBlock>
          Want to login instead? Click <InlineLink to='/login'>here</InlineLink> to
          login.
        </TextBlock>
      </ResetPasswordWrapper>
    </MainLayout>
  )
}
export default ResetPassword;
