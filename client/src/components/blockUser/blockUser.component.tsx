// React
import React from 'react';
import { useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import {
  BlockUserWrapper,
  BlockUserButton,
  BlockUserButtonText,
} from './blockUser.styles';
// Components
import ButtonLoader from '../buttonLoader/buttonLoader.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { blockUserStart } from '../../redux/user/user.actions';

type BlockUserProps = {
  id: string;
  username?: string;
};

const BlockUser: React.FC<BlockUserProps> = ({ id, username }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.utils.loading );
  const history = useHistory();

  const onClickHandler = () => {
    dispatch(blockUserStart(id));
    setTimeout(() => {
      history.push('/');
    }, 300);
  };
  return (
    <BlockUserWrapper>
      <BlockUserButton onClick={onClickHandler} type='button' disabled={loading}>
        {loading ? (
          <ButtonLoader />
        ) : (
          <>
            <FontAwesomeIcon icon={faUserSlash} />
            <BlockUserButtonText>{t('Block')} {username}</BlockUserButtonText>
          </>
        )}
      </BlockUserButton>
    </BlockUserWrapper>
  );
};
export default BlockUser;
