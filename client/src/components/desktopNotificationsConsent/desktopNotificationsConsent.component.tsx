import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import {
  setLastAskedTs,
  setNotificationsAskingBlock,
  setNotificationsWaiting,
} from '../../redux/utils/utils.actions';
import TextBlock from '../textBlock/textBlock.component';
import {
  DesktopNotificationsConsentWrapper,
  DesktopNotificationsConsentButton,
  DesktopNotificationsConsentButtons,
  DesktopNotificationsConsentCheckboxLabel,
} from './desktopNotificationsConsent.styles';

type DesktopNotificationsConsentProps = {};

const DesktopNotificationsConsent: React.FC<DesktopNotificationsConsentProps> =
  () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const waiting = useSelector(
      (state: RootState) => state.utils.notificationsWaiting
    );
    const blocked = useSelector(
      (state: RootState) => state.utils.notificationsAskingBlocked
    );
    const lastTS = useSelector((state: RootState) => state.utils.lastAskedTs);
    const dispatch = useDispatch();
    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if ('Notification' in window) {
        if (
          Notification.permission === 'denied' ||
          Notification.permission === 'granted'
        ) {
          dispatch(setNotificationsAskingBlock(true));
        }
        timeout = setTimeout(() => {
          setVisible(Notification.permission === 'default' && !blocked);
        }, 30000);
      }
      return () => {
        clearTimeout(timeout);
      };
    }, [blocked, dispatch]);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if ('Notification' in window && !blocked && waiting) {
        interval = setInterval(() => {
          if ((lastTS ?? 0) + 900000 < Date.now()) {
            dispatch(setNotificationsWaiting(false));
            setVisible(true);
          }
        }, 1000);
      }
      return () => {
        clearInterval(interval);
      };
    }, [waiting, lastTS, dispatch, blocked]);

    const urlBase64ToUint8Array = (base64String: string | undefined) => {
      if (!base64String) {
        return '';
      }
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    };

    const handleAccept = async () => {
      const createNotificationSubscription =
        async (): Promise<PushSubscription> => {
          const serviceWorker = await navigator.serviceWorker.ready;
          return await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.REACT_APP_PUBLIC_VAPID_KEY ??
                'BIG3cMwUIpcJqf2O_3shA0xNW0goryYWDHEyu8e5HYbHLEcNEopLGXbp5eCyyYIyPm-G3gzWW655xEKPgzWNLis'
            ),
          });
        };
      const subscription = await createNotificationSubscription();
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'content-type': 'application/json',
        },
      });
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
    };

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
                <input
                  id='dontAskAgain'
                  type='checkbox'
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
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
