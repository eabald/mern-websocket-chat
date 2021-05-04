// React
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { inviteUserStart } from '../../redux/user/user.actions';
import { buyInvitationsCheckStatusStart } from '../../redux/payment/payment.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Styled
import { InviteNewUserContent } from './inviteNewUser.styles';
// Validators
import InviteNewUserSchema from '../../validators/inviteNewUser.validator';
// Components
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import ButInvitations from '../../components/buyInvitations/buyInvitations.component';
import MainLayout from '../../layout/main/main.layout';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import BackButton from '../../components/backButton/backButton.component';

type InviteNewUserProps = {};
interface FormValues {
  email: string;
}

// redirect do checkout jeżeli jest id, zapisać na user,

const InviteNewUser: React.FC<InviteNewUserProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const payed = useSearchParams().get('payed');
  const noOfInvitations = useSelector(
    (state: RootState) => state.user.user?.fomo.invitations
  );
  const loading = useSelector((state: RootState) => state.utils.loading);
  const sessionId = useSelector((state: RootState) => state.payment.id)
  const [hasInvitations, setHasInvitations] = useState(!!(noOfInvitations && noOfInvitations > 48));
  const submitHandler = async ({ email }: FormValues): Promise<void> => {
    await dispatch(inviteUserStart(email));
  };
  useEffect(() => {
    if ((payed && sessionId)) {
      dispatch(buyInvitationsCheckStatusStart(sessionId));
    }
  });
  useEffect(() => {
    setHasInvitations(!!(noOfInvitations && noOfInvitations > 48));
  }, [noOfInvitations, loading])
  return (
    <MainLayout>
      <InviteNewUserContent>
        <SmallHeader>
          {t('Invite new user')}
        </SmallHeader>
        <TextBlock>
          {t('invitation info', {
            invitations: noOfInvitations ? noOfInvitations.toString() : '0',
          })}
        </TextBlock>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={InviteNewUserSchema}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            submitHandler(values)
              .then(() => actions.setSubmitting(false))
              .finally(() => history.goBack());
          }}
        >
          {(props) => (
            <Form>
              <FormGroup>
                <Label htmlFor='email'>{t('New user email')}</Label>
                <FormField
                  id='email'
                  name='email'
                  type='email'
                  error={props.touched.email && props.errors.email}
                />
                <ErrorMessage
                  name='email'
                  render={(error) => <ValidationError>{error}</ValidationError>}
                />
              </FormGroup>
              <FormGroup>
                <SubmitButton
                  disabled={
                    (!props.isValid || props.isSubmitting) && hasInvitations
                  }
                  loading={props.isSubmitting}
                  label={t('Send')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </InviteNewUserContent>
      {hasInvitations ? '' : <ButInvitations />}
      <BackButton to='/' />
    </MainLayout>
  );
};
export default InviteNewUser;
