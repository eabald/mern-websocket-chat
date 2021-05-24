// React
import React from 'react';
import { useLocation } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/root-reducer';
import { Room } from '../../redux/room/room.types';
import { setCurrentRoomStart } from '../../redux/room/room.actions';
// I18N
import { useTranslation } from 'react-i18next';
// Styled
import { DmsListWrapper, DmsListItem, DmsListItemAdd } from './dmsList.styles';
// Components
import SectionHeader from '../sectionHeader/sectionHeader.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import ActiveIcon from '../activeIcon/activeIcon.component'

type DmsListProps = {};

const DmsList: React.FC<DmsListProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dms = useSelector((state: RootState) => state.room.rooms).filter(room => room.type === 'dm');
  const currentRoom = useSelector((state: RootState) => state.room.currentRoom);
  const currentUserId = useSelector((state: RootState) => state.user.user?._id);
  const setDm = (room: Room) => dispatch(setCurrentRoomStart(room));
  const location = useLocation();
  return (
    <>
      <SectionHeader>{t('Direct messages')}</SectionHeader>
      <DmsListWrapper>
        {dms.map((dm: Room) => (
          <DmsListItem key={dm._id} onClick={() => setDm(dm)} active={currentRoom && currentRoom._id === dm._id}>
            {dm.active ? <ActiveIcon /> : ''}
            {dm.users.filter(user => user.id !== currentUserId).map(user => user.username).join(', ')}
            {dm.hasUnreadMessages && currentRoom && currentRoom._id !== dm._id ? (
              <FontAwesomeIcon icon={faExclamation} style={{ paddingLeft: '10px' }} />
            ) : null}
          </DmsListItem>
        ))}
        <DmsListItemAdd
          to={{
            pathname: `/modal/${t('add-new-dm')}`,
            state: { background: location }
          }}
        >
          {t('Add new direct message')}
        </DmsListItemAdd>
      </DmsListWrapper>
    </>
  );
};
export default DmsList;
