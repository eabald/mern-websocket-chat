import React from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/auth/auth.actions';
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';

import { RegisterWrapper } from './register.styles';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import AuthLayout from '../../layout/auth/auth.layout';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import RegisterFormValidationSchema from '../../validators/registerForm.validator';

type RegisterProps = {};
interface RegisterValues {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const submitHandler = async (values: RegisterValues): Promise<void> => {
    await dispatch(signUpStart(values));
  };

  return (
    <AuthLayout>
      <RegisterWrapper>
        <SmallHeader>Register</SmallHeader>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={RegisterFormValidationSchema}
          onSubmit={(
            values: RegisterValues,
            actions: FormikHelpers<RegisterValues>
          ) => {
            submitHandler(values);
          }}
        >
          {({touched, errors, isValid, isSubmitting}) => (
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
              <FormGroup>
                <SubmitButton disabled={!isValid || isSubmitting} />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </RegisterWrapper>
    </AuthLayout>
  );
};
export default Register;
