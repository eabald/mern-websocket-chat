// React
import React, { useEffect, useRef, useState, useContext } from 'react';
// External
import { Formik, FormikHelpers, Form } from 'formik';
// Utils
import checkText from '../../utils/smile2emoji';
// Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// Hooks
import useWebsocket from '../../hooks/useWebsocket';
// Context
import { SocketContext } from '../../context/socket';
// Validators
import MessageFormValidationSchema from '../../validators/messageForm.validator';
// Styled
import {
  MessageFormWrapper,
  MessageFormTextArea,
  MessageFormSubmit,
  MessageFromEmojiPicker,
  MessageFromEmojiPickerTrigger,
} from './messageForm.styles';
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmileWink } from '@fortawesome/free-solid-svg-icons';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

type MessageFormProps = {};
interface FormValues {
  msg: string;
}

const MessageForm: React.FC<MessageFormProps> = () => {
  const socket = useContext(SocketContext);
  const { sendMessage } = useWebsocket(socket);
  const [pickerOpen, setPickerOpen] = useState(false);
  const formRef = useRef<HTMLTextAreaElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, []);
  const clickHandler = (e: MouseEvent) => e.target !== pickerRef.current && e.target !== triggerRef.current
  ? setPickerOpen(false)
  : null;
  const submitHandler = async ({ msg }: FormValues): Promise<void> => {
    if (user && room && msg.trim().length) {
      const newMsg = {
        content: msg,
        user,
        room,
        timestamp: new Date(),
      };
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
      {({ isValid, handleChange, values, handleSubmit, setFieldValue }) => (
        <MessageFormWrapper>
          <Form>
            <MessageFromEmojiPickerTrigger
              onClick={() => setPickerOpen(!pickerOpen)}
              ref={triggerRef}
            >
              <FontAwesomeIcon icon={faSmileWink} />
            </MessageFromEmojiPickerTrigger>
            <MessageFromEmojiPicker ref={pickerRef}>
              {pickerOpen ? (
                <Picker
                  theme='dark'
                  title=''
                  emoji=''
                  onSelect={(emoji: any) => {
                    setFieldValue('msg', `${values.msg}${emoji.native}`, true);
                    setPickerOpen(false);
                    formRef.current?.focus();
                  }}
                />
              ) : (
                ''
              )}
            </MessageFromEmojiPicker>
            <MessageFormTextArea
              name='msg'
              id='msg'
              onChange={(e) => {
                e.target.value = checkText(e.target.value);
                handleChange(e);
              }}
              onKeyUp={(e) => onEnterPress(e, handleSubmit)}
              value={values.msg}
              ref={formRef}
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
