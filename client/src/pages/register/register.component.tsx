import React from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/auth/auth.actions';
import { Formik, FormikHelpers, Form } from 'formik';

import { RegisterWrapper } from './register.styles';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import AuthLayout from '../../layout/auth/auth.layout';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';

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
          onSubmit={(
            values: RegisterValues,
            actions: FormikHelpers<RegisterValues>
          ) => {
            submitHandler(values);
          }}
        >

          <Form>
            <FormGroup>
              <Label htmlFor='email'>Email</Label>
              <FormField id='email' name='email' type='email' placeholder='awesome@person.com' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='username'>Username</Label>
              <FormField id='username' name='username' type='text' placeholder='AwesomePerson' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='firstName'>First name</Label>
              <FormField id='firstName' name='firstName' type='text' placeholder='Awesome' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='lastName'>Last name</Label>
              <FormField id='lastName' name='lastName' type='text' placeholder='Person' />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <FormField id='password' name='password' type='password'/>
            </FormGroup>
            <FormGroup>
              <SubmitButton />
            </FormGroup>
          </Form>
        </Formik>
      </RegisterWrapper>
    </AuthLayout>
  );
};
export default Register;
