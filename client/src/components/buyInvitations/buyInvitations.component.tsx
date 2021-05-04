// React
import React from 'react';
// Redux
import { useDispatch } from 'react-redux';
// External
import { useTranslation } from 'react-i18next';
// Styled
import {
  BuyInvitationWrapper,
  BuyInvitationBox,
  BuyInvitationCloseWrapper,
  BuyInvitationButton,
} from './buyInvitations.styles';
// Components
import SmallHeader from '../smallHeader/smallHeader.component';
import TextBlock from '../textBlock/textBlock.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { buyInvitationCreateSessionStart } from '../../redux/payment/payment.actions';

type BuyInvitationsProps = {};

const BuyInvitations: React.FC<BuyInvitationsProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(buyInvitationCreateSessionStart());
  }
  return (
    <BuyInvitationWrapper>
      <BuyInvitationBox>
        <BuyInvitationCloseWrapper to='/'>
          <FontAwesomeIcon icon={faTimes} />
        </BuyInvitationCloseWrapper>
        <SmallHeader>
          {t('Not good!')}
        </SmallHeader>
        <TextBlock>
          {t('Tough luck! You are out of free invitations! But fortunately you can buy another 3 for only 4.99 $.')}
        </TextBlock>
        <BuyInvitationButton onClick={handleClick}>
          <FontAwesomeIcon icon={faDollarSign} />{' '}
          {t('Buy for 4.99')}
        </BuyInvitationButton>
      </BuyInvitationBox>
    </BuyInvitationWrapper>
  );
};
export default BuyInvitations;
