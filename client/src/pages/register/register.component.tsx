// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/auth/auth.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
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

type RegisterProps = {};
interface RegisterValues {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  terms: boolean;
}

const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const submitHandler = async (values: RegisterValues): Promise<void> => {
    await dispatch(signUpStart(values));
  };

  return (
    <MainLayout>
      <RegisterWrapper>
        <SmallHeader>Register</SmallHeader>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            terms: false,
          }}
          validationSchema={RegisterFormValidationSchema}
          onSubmit={(
            values: RegisterValues,
            actions: FormikHelpers<RegisterValues>
          ) => {
            submitHandler(values);
            setTimeout(() => actions.setSubmitting(false), 500);
          }}
        >
          {({touched, errors, isValid, isSubmitting, values}) => (
            <Form>
              <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <FormField id='email' name='email' type='email' placeholder='awesome@person.com'  error={touched.email && errors.email} />
                <ErrorMessage name='email' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='username'>Username</Label>
                <FormField id='username' name='username' type='text' placeholder='AwesomePerson'  error={touched.username && errors.username} />
                <ErrorMessage name='username' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='firstName'>First name</Label>
                <FormField id='firstName' name='firstName' type='text' placeholder='Awesome' error={touched.firstName && errors.firstName} />
                <ErrorMessage name='FirstName' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='lastName'>Last name</Label>
                <FormField id='lastName' name='lastName' type='text' placeholder='Person' error={touched.lastName && errors.lastName} />
                <ErrorMessage name='lastName' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <FormField id='password' name='password' type='password' error={touched.password && errors.password}/>
                <ErrorMessage name='password' render={error => <ValidationError>{error}</ValidationError>} />
              </FormGroup>
              <Checkbox
                name='terms'
                error={touched.terms && errors.terms}
                errorInfo={<ErrorMessage name='terms' render={error => <ValidationError>{error}</ValidationError>} />}
              >
                Accept <InlineLink to='/terms-and-conditions'>terms and conditions</InlineLink>
              </Checkbox>
              <FormGroup>
                <SubmitButton disabled={!isValid || isSubmitting || !values.terms}  loading={isSubmitting}/>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </RegisterWrapper>
    </MainLayout>
  );
};
export default Register;
