import { getItemFromStorage, setItemToStorage } from 'utils/localStorage';
import { USER } from 'utils/localStorageSelectors';
import { nanoid } from 'nanoid';

export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const updatePlayer = user => ({
  type: UPDATE_PLAYER,
  payload: user,
});

export const createAnonUser = () => {
  const userFromLS = getItemFromStorage(USER);
  console.log(
    'createAnonUser',
    userFromLS,
    userFromLS && userFromLS.id,
    nanoid(),
  );
  const user = userFromLS && userFromLS.id ? userFromLS : { id: nanoid(), anon: true };
  setItemToStorage(USER, user);
  return dispatch => dispatch(updatePlayer(user));
};
