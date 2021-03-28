// React
import React from 'react';
// External
import { Formik, FormikHelpers, Form } from 'formik';
// Utils
import checkText from '../../utils/smile2emoji';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Hooks
import useWebsocket from '../../hooks/useWebsocket';
// Validators
import MessageFormValidationSchema from '../../validators/messageForm.validator';
// Styled
import {
  MessageFormWrapper,
  MessageFormTextArea,
  MessageFormSubmit,
} from './messageForm.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

type MessageFormProps = {};
interface FormValues {
  msg: string;
}

const MessageForm: React.FC<MessageFormProps> = () => {
  const { sendMessage } = useWebsocket();
  const submitHandler = async ({ msg }: FormValues): Promise<void> => {
    if (user && room && msg.trim().length) {
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
      {({ isValid, handleChange, values, handleSubmit }) => (
        <MessageFormWrapper>
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
              <FontAwesomeIcon icon={faPaperPlane} />
            </MessageFormSubmit>
          </Form>
        </MessageFormWrapper>
      )}
    </Formik>
  );
};
export default MessageForm;
