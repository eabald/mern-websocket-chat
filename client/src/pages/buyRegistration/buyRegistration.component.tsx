// React
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { buyRegistrationCheckStatusStart, buyRegistrationCreateSessionStart } from '../../redux/payment/payment.actions';
// External
import { Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
// I18N
import { useTranslation } from 'react-i18next';
// Hooks
import useSearchParams from '../../hooks/useSearchParams';
// Validators
import BuyRegistrationSchema from '../../validators/buyRegistration.validator';
// Styled
import { BuyRegistrationWrapper } from './buyRegistration.styles';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Components
import SubmitButton from '../../components/form/submitButton/submitButton.component';
import FormGroup from '../../components/form/formGroup/formGroup.component';
import ValidationError from '../../components/form/validationError/validationError.component';
import Label from '../../components/form/label/label.component';
import FormField from '../../components/form/formField/formField.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import InlineLink from '../../components/inlineLink/inlineLink.component';
import Checkbox from '../../components/form/checkbox/checkbox.component';
import BackButton from '../../components/backButton/backButton.component';

type BuyRegistrationProps = {};
interface FormValues {
  email: string;
  terms: boolean;
}

const BuyRegistration: React.FC<BuyRegistrationProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const payed = useSearchParams().get('payed');
  const paymentError = useSearchParams().get('error');
  const sessionId = useSelector((state: RootState) => state.payment.id)
  useEffect(() => {
    if (payed && sessionId) {
      dispatch(buyRegistrationCheckStatusStart(sessionId));
    } else if (paymentError && sessionId) {
      history.replace({
        search: '',
      })
      dispatch(buyRegistrationCheckStatusStart(sessionId));
    }
  }, [dispatch, history, payed, sessionId, paymentError]);
  const submitHandler = async (values: FormValues): Promise<void> => {
    await dispatch(buyRegistrationCreateSessionStart(values));
  };
  return (
    <MainLayout>
      <BackButton to='/register' />
      <BuyRegistrationWrapper>
        <SmallHeader>{t('Buy invitation')}</SmallHeader>
        <Formik
          initialValues={{ email: '', terms: false }}
          validationSchema={BuyRegistrationSchema}
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
                <Label htmlFor='email'>{t('Email')}</Label>
                <FormField
                  id='email'
                  name='email'
                  type='email'
                  error={touched.email && errors.email}
                />
                <ErrorMessage
                  name='email'
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
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                  label={t('Buy invitation')}
                />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </BuyRegistrationWrapper>
    </MainLayout>
  );
};

export default BuyRegistration;
