import React from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import checkText from '../../utils/smile2emoji';
import useWebsocket from '../../hooks/useWebsocket';
import MessageFormValidationSchema from '../../validators/messageForm.validator';
import {
  MessageFormWrapper,
  MessageFormTextArea,
  MessageFormSubmit,
} from './messageForm.styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

type MessageFormProps = {};
interface FormValues {
  msg: string;
}

const MessageForm: React.FC<MessageFormProps> = () => {
  const { sendMessage } = useWebsocket();
  const submitHandler = async ({ msg }: FormValues): Promise<void> => {
    if (user && room) {
      const newMsg = {
        content: msg,
        user,
        room,
        timestamp: new Date(),
      }
      sendMessage(newMsg);
    }
  };
  const user = useSelector((state: RootState) => state.user.user);
  const room = useSelector((state: RootState) => state.room.currentRoom);
  const onEnterPress = (
    e: any,
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  ) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(e);
    }
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        msg: '',
      }}
      validationSchema={MessageFormValidationSchema}
      onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
        submitHandler(values);
        setTimeout(() => actions.setSubmitting(false), 500);
        actions.resetForm({ values: { msg: '' } });
      }}
    >
      {({ isValid, isSubmitting, handleChange, values, handleSubmit }) => (
        <MessageFormWrapper processing={isSubmitting}>
          <Form>
            <MessageFormTextArea
              name='msg'
              id='msg'
              onChange={(e) => {
                e.target.value = checkText(e.target.value);
                handleChange(e);
              }}
              onKeyUp={(e) => onEnterPress(e, handleSubmit)}
              value={values.msg}
            />
            <MessageFormSubmit type='submit' disabled={!isValid}>
              +
            </MessageFormSubmit>
          </Form>
        </MessageFormWrapper>
      )}
    </Formik>
  );
};
export default MessageForm;
