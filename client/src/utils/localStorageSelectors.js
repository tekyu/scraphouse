// eslint-disable-next-line import/no-cycle
import { user } from 'store/user/userSelectors';
import { getItemFromStorage } from 'utils/localStorage';

export const CREATED_TEMPLATES = 'createdTemplates';
export const USER = 'mockuser';

export const getUser = getItemFromStorage(USER) || {};

export const getUserId = () => user.id || null;
