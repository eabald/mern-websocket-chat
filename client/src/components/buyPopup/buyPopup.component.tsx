// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { PaymentAction } from '../../redux/payment/payment.types';
// External
import { useTranslation } from 'react-i18next';
// Styled
import {
  BuyPopupWrapper,
  BuyPopupBox,
  BuyPopupCloseWrapper,
  BuyPopupButton,
} from './buyPopup.styles';
// Components
import SmallHeader from '../smallHeader/smallHeader.component';
import TextBlock from '../textBlock/textBlock.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons';

type BuyPopupProps = {
  price: string;
  action: () => PaymentAction;
  textKey: string
};

const BuyPopup: React.FC<BuyPopupProps> = ({ price, action, textKey }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(action());
  }
  return (
    <BuyPopupWrapper>
      <BuyPopupBox>
        <BuyPopupCloseWrapper to='/'>
          <FontAwesomeIcon icon={faTimes} />
        </BuyPopupCloseWrapper>
        <SmallHeader>
          {t('Not good!')}
        </SmallHeader>
        <TextBlock>
          {/* {t('Tough luck! You are out of free invitations! But fortunately you can buy another 3 for only 4.99 $.')} */}
          {t(textKey, { price })}
        </TextBlock>
        <BuyPopupButton onClick={handleClick}>
          <FontAwesomeIcon icon={faDollarSign} />{' '}
          {t('Buy for label', { price })}
        </BuyPopupButton>
      </BuyPopupBox>
    </BuyPopupWrapper>
  );
};
export default BuyPopup;
