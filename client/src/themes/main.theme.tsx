import { keyframes } from 'styled-components';
import { faBomb, faCheck } from '@fortawesome/free-solid-svg-icons';

export const MainTheme = {
  font: 'roboto',
  modalBackground: '#2e2e2e',
  mainBackground: '#5a5a5a',
  accentsBackground: '#4759a8',
  navBackground: '#2f3131',
  mainTextColor: '#ced7ff',
  secondaryTextColor: '#5a6fca',
  navTextColor: '#979696',
  navBackgroundHover: '#3e3f3f',
  navBackgroundHoverColor: '#e1e1e1',
  white: '#ffffff',
  black: '#000000',
  disabled: '#b6b6b6',
  disabledBackground: '#788ce4',
  scrollBackground: '#5a5a5a',
  messageSubmitButtonBackGround: '#7487da',
  messageSubmitButtonBackGroundDisabled: '#999898',
  loaderBackground: 'rgba(90, 90, 90, 0.75)',

  flashBg: {
    error: '#ca47c0',
    success: '#788ce4',
  },

  flashIconsMap: {
    success: faCheck,
    error: faBomb,
  },

  BounceAnimation: keyframes`
    0% { margin-bottom: 0; }
    50% { margin-bottom: 10px }
    100% { margin-bottom: 0 }
  `,
};
