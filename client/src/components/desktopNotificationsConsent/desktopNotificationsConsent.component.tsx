import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { setLastAskedTs, setNotificationsAskingBlock, setNotificationsWaiting } from '../../redux/utils/utils.actions';
import TextBlock from '../textBlock/textBlock.component';
import {
  DesktopNotificationsConsentWrapper,
  DesktopNotificationsConsentButton,
  DesktopNotificationsConsentButtons,
  DesktopNotificationsConsentCheckboxLabel,
} from './desktopNotificationsConsent.styles';

type DesktopNotificationsConsentProps = {};

const DesktopNotificationsConsent: React.FC<DesktopNotificationsConsentProps> = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const waiting = useSelector((state: RootState) => state.utils.notificationsWaiting);
  const blocked = useSelector((state: RootState) => state.utils.notificationsAskingBlocked);
  const lastTS = useSelector((state: RootState) => state.utils.lastAskedTs);
  const dispatch = useDispatch();
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'denied' || Notification.permission === 'granted') {
        dispatch(setNotificationsAskingBlock(true));
      }
      setTimeout(() => {
        setVisible(Notification.permission === 'default' && !blocked);
      }, 30000);
    }
  }, [blocked, dispatch]);

  useEffect(() => {
    if ('Notification' in window && !blocked && waiting) {
      setInterval(() => {
        if ((lastTS ?? 0) + 90000 > Date.now()) {
          dispatch(setNotificationsWaiting(false));
          setVisible(true);
        }
      }, 1000)
    }
    return () => {
      clearInterval();
    }
  }, [waiting, lastTS, dispatch, blocked])

  const handleAccept = () => {
    Notification.requestPermission();
    dispatch(setNotificationsAskingBlock(true));
    setVisible(false);
  };
  const handleDecline = () => {
    setVisible(false);
    if (dontShowAgain) {
      dispatch(setNotificationsAskingBlock(true));
      dispatch(setNotificationsWaiting(false));
    } else {
      dispatch(setNotificationsWaiting(true));
      dispatch(setLastAskedTs(Date.now()));
    }
  }

  return (
    <>
      {visible ? (
        <DesktopNotificationsConsentWrapper>
          <TextBlock>
            {t('Do you like to receive chat notifications?')}
          </TextBlock>
          <DesktopNotificationsConsentButtons>
            <DesktopNotificationsConsentButton onClick={handleAccept}>
              {t('Accept')}
            </DesktopNotificationsConsentButton>
            <DesktopNotificationsConsentButton onClick={handleDecline}>
              {t('Decline')}
            </DesktopNotificationsConsentButton>
          </DesktopNotificationsConsentButtons>
          <DesktopNotificationsConsentButtons>
            <DesktopNotificationsConsentCheckboxLabel htmlFor='dontAskAgain'>
              <input id='dontAskAgain' type='checkbox' onChange={e => setDontShowAgain(e.target.checked)} />
              {t(`Don't ask again.`)}
            </DesktopNotificationsConsentCheckboxLabel>
          </DesktopNotificationsConsentButtons>
        </DesktopNotificationsConsentWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default DesktopNotificationsConsent;
